const LIGHT_MAX_COUNT = 16;
const LIGHT_TYPE_NULL = 1;
const LIGHT_TYPE_AMBIENT = 2;
const LIGHT_TYPE_DIRECTIONAL = 3;
const LIGHT_TYPE_POINT = 4;

class RenderManager {

    scene = null;

    lightsData = null;

    constructor(scene) {
        this.scene = scene;
    }

    composeLight() {
        const { scene } = this;
        const { lights } = scene;
        if (lights.length > 16) {
            throw new Error('[G3D] Scene could not have more than 16 lights.');
        }
        const target = {
            type: [],
            color: [],
            intensity: [],
            position: []
        }
        for (let i = 0; i < LIGHT_MAX_COUNT; i++) {
            const light = lights[i];
            if (light instanceof DirectionalLight) {
                target.type.push(LIGHT_TYPE_DIRECTIONAL);
                target.color.push(...light.getColor());
                target.intensity.push(light.getIntensity());
                target.position.push(...light.getDirection());
            } else if (light instanceof AmbientLight) {
                target.type.push(LIGHT_TYPE_AMBIENT);
                target.color.push(...light.getColor());
                target.intensity.push(light.getIntensity());
                target.position.push(0, 0, 0);
            } else if (light instanceof PointLight) {
                target.type.push(LIGHT_TYPE_POINT);
                target.color.push(...light.getColor());
                target.intensity.push(light.getIntensity());
                target.position.push(...light.getPosition());
            } else {
                target.type.push(LIGHT_TYPE_NULL);
                target.color.push(0, 0, 0);
                target.intensity.push(0);
                target.position.push(0, 0, 0);
            }
        }
        return {
            type: new Int32Array(target.type),
            color: new Float32Array(target.color.map(c => c / 255)),
            intensity: new Float32Array(target.intensity),
            position: new Float32Array(target.position)
        }
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

    /**
     * The Render Part
     */

    render() {

        const { scene } = this;
        const { engine } = scene;

        if (scene.activeCamera) {

            this.lightsData = this.composeLight();

            const groups = this.groupMeshLayers();

            if (!Env.framebufferNotReady) {

                // engine.bindFramebuffer('picker');

                // this.renderPickingTarget(groups);

                // engine.bindFramebuffer(null);

            }

            if (!Env.framebufferNotReady) {

                // engine.bindFramebuffer('shadow');

                // this.renderShadowTarget(groups);

                // engine.bindFramebuffer(null);

            }

            this.renderMainTarget(groups);
        }
    }

    renderSkybox() {
        const { scene } = this;
        const { engine } = scene;


        const skybox = scene.skybox;
        const camera = scene.activeCamera;
        const texture = skybox.cubeMapTexture.getTexture();
        const mesh = skybox.cubeMapMesh;
        const vmat3 = Mat3.fromMat4(Mat3.create(), camera.getVMatrix());


        engine.useProgram('skybox');

        // TODO: use a new specified geometry(skybox ?) to avoid uploading unnecessary channels
        const geometryBuffers = mesh.geometry.getBuffers();

        engine.attribute('aPosition', geometryBuffers.vertices);
        engine.elements(geometryBuffers.indices.default);

        engine.uniform('uVMatrix3', vmat3);
        engine.uniform('uPMatrix', camera.getPMatrix());
        engine.uniform('uCubeMap', texture);

        this.drawMesh(mesh, 'default');
    }

    renderMainTarget(groups) {

        const { scene } = this;
        const { engine } = scene;

        engine.clearColorBuffer(scene.clearColor);

        // if (scene.skybox) {

        //     engine.clearDepthBuffer();

        //     this.renderSkybox();
        // }

        groups.forEach(meshes => {

            engine.clearDepthBuffer();

            meshes.filter(m => m.getGlobalVisibility()).forEach((mesh) => {

                const materials = mesh.materials;

                for (let k in materials) {

                    const key = k;
                    const material = materials[key];

                    if (material instanceof PhongMaterial) {

                        engine.useProgram('phong', [...material.getDefines()]);

                        this.prepareMVPMatrix(mesh);

                        this.prepareMesh(mesh, key);

                        // this.prepareShadow();

                        // this.prepareManuallyFlipY();

                        this.prepareLights();

                        this.preparePhongMaterial(material);

                        this.drawMesh(mesh, key);

                    } else if (material instanceof RawMaterial) {

                        engine.useProgram('raw', [...material.getDefines()]);

                        this.prepareMesh(mesh, key);

                        this.prepareMVPMatrix(mesh);

                        this.prepareRawMaterial(material);

                        this.drawMesh(mesh, key);

                    } else if (material instanceof PBRMaterial) {

                        engine.useProgram('pbr', [...material.getDefines()]);

                        this.prepareMVPMatrix(mesh);

                        this.prepareMesh(mesh, key);

                        this.prepareLights();

                        this.preparePBRMaterial(material);

                        this.drawMesh(mesh, key);

                    }

                }

            })
        })
    }

    renderPickingTarget(groups) {

        const { scene } = this;
        const { engine } = scene;

        engine.clearColorBuffer({ r: 0, g: 0, b: 0, a: 1 });

        groups.forEach(meshes => {

            engine.clearDepthBuffer();

            meshes.filter(m => m.getPickable()).forEach((mesh) => {

                engine.useProgram('picker');

                this.prepareMVPMatrix(mesh);

                this.prepareMeshPickingTarget(mesh);

                engine.uniform('meshId', [mesh.id]);

                const materials = mesh.materials;

                for (let key in materials) {
                    const material = materials[key];

                    const geometryBuffers = mesh.geometry.getBuffers();
                    engine.elements(geometryBuffers.indices[key].buffer);

                    this.drawMesh(mesh, key);

                }

            });
        })
    }

    renderShadowTarget(groups) {

        const { scene } = this;
        const { engine, lights } = scene;

        const shadowLight = _.find(lights, light => light.castShadow);

        if (shadowLight) {

            const group = groups[0];


            engine.clearDepthBuffer();
            engine.clearColorBuffer({ r: 0, g: 0, b: 0, a: 1 });

            const camera = shadowLight.getShadowCamera();

            group.forEach(mesh => {

                engine.useProgram('shadow');

                this.prepareMVPMatrix(mesh, camera);

                // engine.uniform('uVMatrix', camera.getVMatrix());
                // engine.uniform('uPMatrix', camera.getPMatrix());
                // engine.uniform('uMMatrix', mesh.getWorldMatrix());

                {
                    const materials = mesh.materials;

                    for (let key in materials) {
                        const material = materials[key];

                        this.prepareMeshPickingTarget(mesh);

                        this.drawMesh(mesh, key);

                    }
                }
            })
        }
    }

    /**
     * The Prepare Part
     */

    prepareMVPMatrix = (mesh, camera = this.scene.activeCamera) => {

        const { scene } = this;
        const { engine } = scene;

        engine.uniform('uVMatrix', camera.getVMatrix());
        engine.uniform('uPMatrix', camera.getPMatrix());
        engine.uniform('uMMatrix', mesh.getWorldMatrix());

    }

    prepareMesh = (mesh, key) => {

        const { scene } = this;
        const { engine } = scene;

        const { vertices, uvs, normals, indices } = mesh.geometry.getBuffers();

        if (!vertices) {
            return;
        }

        engine.attribute('aPosition', vertices.buffer, vertices.stride, vertices.offset);

        if (uvs) {
            if (typeof uvs.stride === 'number') {
                engine.attribute('aUV', uvs.buffer, uvs.stride, uvs.offset);
            } else {
                Object.keys(uvs).forEach(key => {
                    engine.attribute(key, uvs[key].buffer, uvs[key].stride, uvs[key].offset);
                })
            }
        }

        if (normals) {
            engine.attribute('aNormal', normals.buffer, normals.stride, normals.offset);
        }

        engine.elements(indices[key].buffer);
    }


    prepareMorphTargetMesh(mesh) {

        const { scene } = this;
        const { engine } = scene;

        const { before, after, phase } = mesh.getMorphPhaseInfo();
        const { vertices: vertices1, uvs: uvs1, normals: normals1 } = mesh.morphTargetsGeometries[before].getBuffers();
        const { vertices: vertices2, uvs: uvs2, normals: normals2 } = mesh.morphTargetsGeometries[after].getBuffers();
        engine.uniform('uMorphTargetFlag', [true]);
        engine.attribute('aPosition', vertices1.buffer, vertices1.stride, vertices1.offset);
        engine.attribute('aPosition2', vertices2.buffer, vertices2.stride, vertices2.offset);
        engine.attribute('aUV', uvs1.buffer, uvs1.stride, uvs1.offset);
        engine.attribute('aUV2', uvs2.buffer, uvs2.stride, uvs2.offset);
        engine.attribute('aNormal', normals1.buffer, normals1.stride, normals1.offset);
        engine.attribute('aNormal2', normals2.buffer, normals2.stride, normals2.offset);
        engine.uniform('uMorphPhase', [phase]);

    }

    prepareMeshPickingTarget = (mesh) => {
        const { scene } = this;
        const { engine } = scene;

        if (mesh instanceof MorphTargetMesh) {

            this.prepareMorphTargetMeshPickingTarget(mesh);

        } else if (mesh instanceof Mesh) {

            this.prepareBasicMeshPickingTarget(mesh);

        } else if (mesh instanceof LineMesh) {

            this.prepareLineMeshPickingTarget(mesh);

        }
    }

    prepareMorphTargetMeshPickingTarget(mesh) {

        const { scene } = this;
        const { engine } = scene;

        const { before, after, phase } = mesh.getMorphPhaseInfo();
        const { vertices: vertices1 } = mesh.morphTargetsGeometries[before].getBuffers();
        const { vertices: vertices2 } = mesh.morphTargetsGeometries[after].getBuffers();
        engine.uniform('uMorphTargetFlag', [true]);
        engine.attribute('aPosition', vertices1.buffer, vertices1.stride, vertices1.offset);
        engine.attribute('aPosition2', vertices2.buffer, vertices2.stride, vertices2.offset);
        engine.uniform('uMorphPhase', [phase]);

    }

    prepareBasicMeshPickingTarget(mesh) {

        const { scene } = this;
        const { engine } = scene;

        const { vertices } = mesh.geometry.getBuffers();
        engine.uniform('uMorphTargetFlag', [false]);
        engine.attribute('aPosition', vertices.buffer, vertices.stride, vertices.offset);
        engine.attribute('aPosition2', vertices.buffer, vertices.stride, vertices.offset);
        engine.uniform('uMorphPhase', [0]);
    }

    prepareLineMeshPickingTarget = (mesh) => {

        const { scene } = this;
        const { engine } = scene;

        this.prepareBasicMeshPickingTarget(mesh);

        engine.lineWidth(mesh.lineWidth);

    }

    prepareMeshShadowTarget = this.prepareMeshPickingTarget;

    preparePhongMaterial(material) {

        const { scene } = this;
        const { engine } = scene;

        if (material.getUseEnvMap()) {

            // const { envMapTexture, envMapCubeTexture } = material;

            // engine.uniform('uEnvMapFlag', [Number(true)]);
            // engine.uniform('uEnvMapTexture', envMapTexture.getTexture());

        } else {

            // const { envMapTexture, envMapCubeTexture } = material;

            // engine.uniform('uEnvMapFlag', [Number(false)]);
            // engine.uniform('uEnvMapTexture', envMapTexture.getTexture());

        }

        engine.uniform('uAmbientColor', material.getAmbientColor());
        if (material.ambientTexture) {
            engine.uniform('uAmbientTexture', material.ambientTexture.getTexture());
        }

        engine.uniform('uDiffuseColor', material.getDiffuseColor());
        if (material.diffuseTexture) {
            engine.uniform('uDiffuseTexture', material.diffuseTexture.getTexture());
        }

        engine.uniform('uSpecularColor', material.getSpecularColor());
        if (material.specularTexture) {
            engine.uniform('uSpecularTexture', material.specularTexture.getTexture());
        }

        engine.uniform('uGlossiness', [material.getGlossiness()]);
    }

    prepareRawMaterial(material) {

        const { scene } = this;
        const { engine } = scene;

        if (material.getSource() === Material.COLOR) {
            engine.uniform('uColor', material.getColor());
        } else {
            engine.uniform('uTexture', material.texture.getTexture());
        }
    }

    preparePBRMaterial(material) {

        const { scene } = this;
        const { engine } = scene;

        if (material.albedoSource === Material.TEXTURE) {
            engine.uniform('uMaterialAlbedoTexture', material.albedoTexture.getTexture());
        }

        engine.uniform('uMaterialAlbedoColor', material.getAlbedoColor());
        engine.uniform('uMaterialRoughness', [material.getRoughness()]);
        engine.uniform('uMaterialMetallic', [material.getMetallic()]);

        if (material.useMetallicRoughnessTexture) {
            engine.uniform('uMaterialMetallicRoughnessTexture', material.metallicRoughnessTexture.getTexture());
        }

        engine.uniform('uSpecularMap', material.pbrEnviroment.specular.getTexture());
        engine.uniform('uDiffuseMap', material.pbrEnviroment.diffuse.getTexture());
        engine.uniform('uBRDFLUT', material.pbrEnviroment.brdfLUT.getTexture());

    }

    prepareLights() {

        const { scene } = this;
        const { engine } = scene;

        engine.uniform('uLightType', this.lightsData.type);
        engine.uniform('uLightColor', this.lightsData.color);
        engine.uniform('uLightIntensity', this.lightsData.intensity);
        engine.uniform('uLightPosition', this.lightsData.position);

        engine.uniform('uCameraPosition', scene.activeCamera.getPosition());

    }

    prepareShadow() {

        const { scene } = this;
        const { engine } = scene;

        const shadowLight = _.find(scene.lights, light => light.castShadow);

        if (shadowLight) {

            engine.uniform('uShadowFlag', [true]);

            const { colorTarget: shadowMapTexture } = engine.getFramebuffer('shadow');

            engine.uniform('uShadowMapTexture', shadowMapTexture);

            const shadowCamera = shadowLight.getShadowCamera();

            engine.uniform('uShadowVMatrix', shadowCamera.getVMatrix());
            engine.uniform('uShadowPMatrix', shadowCamera.getPMatrix());

        } else {

            engine.uniform('uShadowFlag', [false]);

        }

    }

    prepareManuallyFlipY() {

        const { scene } = this;
        const { engine } = scene;

        engine.uniform('manuallyFlipY', [Number(Env.manuallyFlipY)]);

    }

    drawMesh = (mesh, key) => {

        const { scene } = this;
        const { engine } = scene;

        const { indices } = mesh.geometry.getBuffers();

        if (indices[key]) {
            engine.draw(indices[key].mode, indices[key].count, indices[key].type, indices[key].offset);
        }
    }
}

export default RenderManager;