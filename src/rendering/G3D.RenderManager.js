const LIGHT_MAX_COUNT = 16;
const LIGHT_TYPE_NULL = 1;
const LIGHT_TYPE_AMBIENT = 2;
const LIGHT_TYPE_DIRECTIONAL = 3;
const LIGHT_TYPE_POINT = 4;

class RenderManager {

    scene = null;

    constructor(scene) {
        this.scene = scene;
    }

    groupMeshLayers() {

        const { scene } = this;
        const { meshes } = scene;

        const groups = [];

        meshes.forEach(function (mesh) {

            const i = mesh.getRenderLayerIndex();

            if (!groups[i]) {
                groups[i] = [];
            }

            groups[i].push(mesh);

        })

        return groups.filter(Boolean);
    }

    render() {

        const { scene } = this;

        const engine = Engine.instance;

        if (scene.activeCamera) {

            const groups = this.groupMeshLayers();

            if (!Env.framebufferNotReady) {

                engine.bindFramebuffer('picker');

                this.renderToPickerRenderBuffer(groups);

                engine.bindFramebuffer(null);

            }

            if (!Env.framebufferNotReady) {

                engine.bindFramebuffer('shadow');

                this.renderToShadowRenderBuffer(groups);

                engine.bindFramebuffer(null);

            }

            this.renderToScreen(groups);

        }
    }

    renderToScreen(groups) {

        const { scene } = this;

        const engine = Engine.instance;

        engine.clearColorBuffer(scene.clearColor);

        if (scene.skybox) {

            engine.clearDepthBuffer();

            this.drawSkybox();
        }

        const globalDefines = [];

        if (scene.lights.filter(lt => lt.castShadow).length > 0) {
            globalDefines.push('CAST_SHADOW');
        }

        groups.forEach(meshes => {

            engine.clearDepthBuffer();

            meshes.filter(m => m.getGlobalVisibility()).forEach((mesh) => {

                mesh.geometry.bufferViews.indices &&
                    Object.keys(mesh.geometry.bufferViews.indices).forEach(key => {

                        const material = mesh.materials[key];

                        if (material instanceof RawMaterial) {

                            engine.useProgram(
                                'raw',
                                [...material.getDefines(), ...globalDefines]
                            );

                            this.prepareMVPMatrix(mesh);

                            this.prepareGeometry(mesh.geometry);

                            this.prepareRawMaterial(material);

                            this.drawMesh(mesh, key);

                        } else if (material instanceof PhongMaterial) {

                            engine.useProgram(
                                'phong',
                                [...material.getDefines(), ...globalDefines]
                            );

                            this.prepareMVPMatrix(mesh);

                            this.prepareLights();

                            this.prepareGeometry(mesh.geometry);

                            this.preparePhongMaterial(material);

                            this.prepareShadow();

                            this.drawMesh(mesh, key);

                        } else if (material instanceof PBRMaterial) {

                            engine.useProgram(
                                'pbr',
                                [...material.getDefines(), ...globalDefines]
                            );

                            this.prepareMVPMatrix(mesh);

                            this.prepareLights();

                            this.prepareGeometry(mesh.geometry);

                            this.preparePBRMaterial(material);

                            this.drawMesh(mesh, key);

                        }
                    })
            })
        });

    }

    renderToPickerRenderBuffer(groups) {

        const engine = Engine.instance;

        engine.clearColorBuffer({ r: 0, g: 0, b: 0, a: 1 });

        groups.forEach(meshes => {

            engine.clearDepthBuffer();

            meshes.filter(m => m.getPickable() && m.getGlobalVisibility()).forEach((mesh) => {


                Object.keys(mesh.materials).forEach(key => {

                    const material = mesh.materials[key];

                    if (material) {
                        engine.useProgram('picker');

                        this.prepareMVPMatrix(mesh);

                        this.prepareGeometry(mesh.geometry);

                        engine.uniform('meshId', [mesh.id]);

                        this.drawMesh(mesh, key);
                    }
                })
            });
        })
    }

    renderToShadowRenderBuffer(groups) {

        const { scene } = this;
        const { lights } = scene;

        const engine = Engine.instance;

        const shadowLight = _.find(lights, light => light.castShadow);

        if (shadowLight) {

            const group = groups[0];

            engine.clearColorBuffer({ r: 0, g: 0, b: 0, a: 1 });
            engine.clearDepthBuffer();

            const camera = shadowLight.getShadowCamera();

            group.forEach(mesh => {

                Object.keys(mesh.geometry.bufferViews.indices).forEach(key => {

                    const material = mesh.materials[key];

                    if (material) {

                        engine.useProgram('shadow');

                        this.prepareMVPMatrix(mesh, camera);

                        this.prepareGeometry(mesh.geometry);

                        this.drawMesh(mesh, key);
                    }
                });
            })
        }
    }

    prepareMVPMatrix = (mesh, camera = this.scene.activeCamera) => {

        const engine = Engine.instance;

        engine.uniform('uVMatrix', camera.getVMatrix());
        engine.uniform('uPMatrix', camera.getPMatrix());
        engine.uniform('uMMatrix', mesh.getWorldMatrix());
    }

    prepareLights() {

        const { scene } = this;
        const engine = Engine.instance;

        const { lights, activeCamera } = scene;

        const type = [];
        const color = [];
        const intensity = [];
        const position = [];

        if (lights.length > 16) {
            throw new Error('[G3D] Scene could not have more than 16 lights.');
        }
        for (let i = 0; i < LIGHT_MAX_COUNT; i++) {
            const light = lights[i];
            if (light instanceof DirectionalLight) {
                type.push(LIGHT_TYPE_DIRECTIONAL);
                color.push(...light.getColor());
                intensity.push(light.getIntensity());
                position.push(...light.getDirection());
            } else if (light instanceof AmbientLight) {
                type.push(LIGHT_TYPE_AMBIENT);
                color.push(...light.getColor());
                intensity.push(light.getIntensity());
                position.push(0, 0, 0);
            } else if (light instanceof PointLight) {
                type.push(LIGHT_TYPE_POINT);
                color.push(...light.getColor());
                intensity.push(light.getIntensity());
                position.push(...light.getPosition());
            } else {
                type.push(LIGHT_TYPE_NULL);
                color.push(0, 0, 0);
                intensity.push(0);
                position.push(0, 0, 0);
            }
        }
        const lightsData = {
            type: new Int32Array(type),
            color: new Float32Array(color.map(c => c / 255)),
            intensity: new Float32Array(intensity),
            position: new Float32Array(position)
        }

        engine.uniform('uLightType', lightsData.type);
        engine.uniform('uLightColor', lightsData.color);
        engine.uniform('uLightIntensity', lightsData.intensity);
        engine.uniform('uLightPosition', lightsData.position);

        engine.uniform('uCameraPosition', activeCamera.getPosition());
    }

    prepareGeometry = (geometry) => {

        const engine = Engine.instance;

        const { vertices, uvs, normals } = geometry.bufferViews;

        if (!vertices) {
            return;
        }

        engine.attribute('aPosition', vertices.buffer.glBuffer, vertices.stride, vertices.offset);

        if (uvs) {

            if (typeof uvs.stride === 'number') {

                engine.attribute('aUV', uvs.buffer.glBuffer, uvs.stride, uvs.offset);

            } else {

                Object.keys(uvs).forEach(key => {
                    engine.attribute(key, uvs[key].buffer.glBuffer, uvs[key].stride, uvs[key].offset);
                })
            }
        }

        if (normals) {
            engine.attribute('aNormal', normals.buffer.glBuffer, normals.stride, normals.offset);
        }

    }

    prepareRawMaterial(material) {

        const engine = Engine.instance;

        engine.uniform('uColor', material.getColor());
        if (material.texture) {
            engine.uniform('uTexture', material.texture.glTexture);
        }

    }

    preparePhongMaterial(material) {

        const engine = Engine.instance;

        engine.uniform('uAmbientColor', material.getAmbientColor());
        if (material.ambientTexture) {
            engine.uniform('uAmbientTexture', material.ambientTexture.glTexture);
        }

        engine.uniform('uDiffuseColor', material.getDiffuseColor());
        if (material.diffuseTexture) {
            engine.uniform('uDiffuseTexture', material.diffuseTexture.glTexture);
        }

        engine.uniform('uSpecularColor', material.getSpecularColor());
        if (material.specularTexture) {
            engine.uniform('uSpecularTexture', material.specularTexture.glTexture);
        }

        if (material.specularEnvMapTexture) {
            engine.uniform('uSpecularEnvMapTexture', material.specularEnvMapTexture.glTexture);
        }

        engine.uniform('uGlossiness', [material.getGlossiness()]);
    }

    preparePBRMaterial(material) {

        const engine = Engine.instance;

        engine.uniform('uMaterialAlbedoColor', material.getAlbedoColor());

        engine.uniform('uMaterialRoughness', [material.getRoughness()]);

        engine.uniform('uMaterialMetallic', [material.getMetallic()]);

        if (material.albedoTexture) {
            engine.uniform('uMaterialAlbedoTexture', material.albedoTexture.glTexture);
        }

        if (material.metallicRoughnessTexture) {
            engine.uniform('uMaterialMetallicRoughnessTexture', material.metallicRoughnessTexture.glTexture);
        }

        if (material.emissiveTexture) {
            engine.uniform('uMaterialEmissiveTexture', material.emissiveTexture.glTexture);
        }

        if (material.normalTexture) {
            engine.uniform('uMaterialNormalTexture', material.normalTexture.glTexture);
        }

        engine.uniform('uSpecularMap', material.pbrEnviroment.specular.glTexture);
        engine.uniform('uSpecularMipLevel', [material.pbrEnviroment.specular.mipLevel]);
        engine.uniform('uDiffuseMap', material.pbrEnviroment.diffuse.glTexture);
        engine.uniform('uBRDFLUT', material.pbrEnviroment.brdfLUT.glTexture);

    }

    prepareShadow() {

        const engine = Engine.instance;

        const { scene } = this;

        const shadowLights = scene.lights.filter(lt => lt.castShadow);

        if (shadowLights.length > 0) {

            const shadowLight = shadowLights[0];

            const { colorTarget: shadowMapTexture } = engine.getFramebuffer('shadow');
            engine.uniform('uShadowMapTexture', shadowMapTexture);

            const shadowCamera = shadowLight.getShadowCamera();
            engine.uniform('uShadowVMatrix', shadowCamera.getVMatrix());
            engine.uniform('uShadowPMatrix', shadowCamera.getPMatrix());

        }

    }

    drawMesh = (mesh, key) => {

        const engine = Engine.instance;

        const { indices } = mesh.geometry.bufferViews;

        if (indices && indices[key]) {

            engine.elements(indices[key].buffer.glBuffer);

            engine.draw(indices[key].mode, indices[key].count, indices[key].type, indices[key].offset);
        }

    }

    drawSkybox() {

        const engine = Engine.instance;

        const { scene } = this;

        const skybox = scene.skybox;
        const camera = scene.activeCamera;
        const texture = skybox.cubeMapTexture.glTexture;
        const mesh = skybox.cubeMapMesh;

        const vmat3 = Mat3.fromMat4(Mat3.create(), camera.getVMatrix());

        engine.useProgram('skybox');

        const geometryBuffers = mesh.geometry.bufferViews;

        engine.attribute('aPosition', geometryBuffers.vertices.buffer.glBuffer, geometryBuffers.vertices.stride, geometryBuffers.vertices.offset);

        engine.uniform('uVMatrix3', vmat3);
        engine.uniform('uPMatrix', camera.getPMatrix());
        engine.uniform('uCubeMap', texture);

        this.drawMesh(mesh, 'default');
    }
}

export default RenderManager;