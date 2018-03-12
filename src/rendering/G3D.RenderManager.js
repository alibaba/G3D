const LIGHT_MAX_COUNT = 16;
const LIGHT_TYPE_NULL = 1;
const LIGHT_TYPE_AMBIENT = 2;
const LIGHT_TYPE_DIRECTIONAL = 3;
const LIGHT_TYPE_POINT = 4;
const LIGHT_TYPE_HEMISPHERE = 5;

class RenderManager {

    scene = null;
    renderData = {};
    needUpdateRenderData = true;

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
            color1: [],
            color2: [],
            intensity: [],
            position: []
        }
        for (let i = 0; i < LIGHT_MAX_COUNT; i++) {
            const light = lights[i];
            if (light instanceof DirectionalLight) {
                target.type.push(LIGHT_TYPE_DIRECTIONAL);
                target.color1.push(...light.getColor());
                target.color2.push(0, 0, 0);
                target.intensity.push(light.getIntensity());
                target.position.push(...light.getDirection());
            } else if (light instanceof HemisphereLight) {
                target.type.push(LIGHT_TYPE_HEMISPHERE);
                target.color1.push(...light.getSky());
                target.color2.push(...light.getGround());
                target.intensity.push(light.getIntensity());
                target.position.push(...light.getUp());
            } else if (light instanceof AmbientLight) {
                target.type.push(LIGHT_TYPE_AMBIENT);
                target.color1.push(...light.getColor());
                target.color2.push(0, 0, 0);
                target.intensity.push(light.getIntensity());
                target.position.push(0, 0, 0);
            } else if (light instanceof PointLight) {
                target.type.push(LIGHT_TYPE_POINT);
                target.color1.push(...light.getColor());
                target.color2.push(0, 0, 0);
                target.intensity.push(light.getIntensity());
                target.position.push(...light.getPosition());
            } else {
                target.type.push(LIGHT_TYPE_NULL);
                target.color1.push(0, 0, 0);
                target.color2.push(0, 0, 0);
                target.intensity.push(0);
                target.position.push(0, 0, 0);
            }
        }
        return {
            type: new Int32Array(target.type),
            color1: new Float32Array(target.color1.map(c => c / 255)),
            color2: new Float32Array(target.color2.map(c => c / 255)),
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

    render() {

        const { scene } = this;

        if (scene.activeCamera) {

            const groups = this.groupMeshLayers();

            this.renderMainLayer(groups);

            if (!Env.framebufferNotReady) {
                this.renderPickingLayer(groups);
            }

        }

    }

    renderMainLayer(groups) {

        const { scene } = this;
        const { engine } = scene;

        engine.useProgram('default');

        engine.uniform('manuallyFlipY', [Number(Env.manuallyFlipY)]);
        scene.engine.uniform('uVMatrix', scene.activeCamera.getVMatrix());
        scene.engine.uniform('uPMatrix', scene.activeCamera.getPMatrix());
        scene.engine.uniform('uCameraPosition', scene.activeCamera.getPosition());

        const lights = this.composeLight();
        engine.uniform('uLightType', lights.type);
        engine.uniform('uLightColor1', lights.color1);
        engine.uniform('uLightColor2', lights.color2);
        engine.uniform('uLightIntensity', lights.intensity);
        engine.uniform('uLightPosition', lights.position);

        engine.clearColorBuffer(scene.clearColor);

        groups.forEach(meshes => {

            engine.clearDepthBuffer();

            meshes.filter(m => m.getGlobalVisibility()).forEach((mesh) => {
                this.renderMeshMainLayer(mesh);
            })
        })
    }

    renderMeshMainLayer(mesh) {

        const { scene } = this;
        const { engine } = scene;

        engine.uniform('uMMatrix', mesh.getWorldMatrix());

        if (mesh instanceof MorphTargetMesh) {
            const { before, after, phase } = mesh.getMorphPhaseInfo();
            const gBuffer1 = mesh.morphTargetsGeometries[before].getBuffers();
            const gBuffer2 = mesh.morphTargetsGeometries[after].getBuffers();
            engine.uniform('uMorphTargetFlag', [true]);
            engine.attribute('aPosition', gBuffer1.vertices);
            engine.attribute('aUV', gBuffer1.uvs);
            engine.attribute('aNormal', gBuffer1.normals);
            engine.attribute('aPosition2', gBuffer2.vertices);
            engine.attribute('aUV2', gBuffer2.uvs);
            engine.attribute('aNormal2', gBuffer2.normals);
            engine.uniform('uMorphPhase', [phase]);
        } else if (mesh instanceof Mesh || mesh instanceof LineMesh) {
            const geometryBuffers = mesh.geometry.getBuffers();
            engine.uniform('uMorphTargetFlag', [false]);
            engine.attribute('aPosition', geometryBuffers.vertices);
            engine.attribute('aPosition2', geometryBuffers.vertices);
            engine.attribute('aUV', geometryBuffers.uvs);
            engine.attribute('aUV2', geometryBuffers.uvs);
            engine.attribute('aNormal', geometryBuffers.normals);
            engine.attribute('aNormal2', geometryBuffers.normals);
        }

        {
            const materials = mesh.materials;

            for (let k in materials) {
                const key = k;
                const material = materials[key];

                if (material instanceof StandardMaterial) {
                    engine.uniform('uMaterialType', [2]);

                    engine.uniform('uMaterialAmbientTextureFlag', [
                        Number(material.getAmbientSource() === Material.TEXTURE)
                    ]);

                    engine.uniform('uMaterialDiffuseTextureFlag', [
                        Number(material.getDiffuseSource() === Material.TEXTURE)
                    ]);

                    engine.uniform('uMaterialSpecularTextureFlag', [
                        Number(material.getSpecularSource() === Material.TEXTURE)
                    ]);

                    if (material.getUseEnvMap()) {
                        engine.uniform('uEnvMapFlag', [Number(true)]);
                        engine.uniform('uEnvMapTexture', material.envMapTexture.getTexture());
                    } else {
                        engine.uniform('uEnvMapFlag', [Number(false)]);
                    }

                    engine.uniform('uAmbientColor', material.getAmbientColor());
                    engine.uniform('uAmbientTexture', material.ambientTexture.getTexture());

                    engine.uniform('uDiffuseColor', material.getDiffuseColor());
                    engine.uniform('uDiffuseTexture', material.diffuseTexture.getTexture());

                    engine.uniform('uSpecularColor', material.getSpecularColor());
                    engine.uniform('uSpecularTexture', material.specularTexture.getTexture());
                    engine.uniform('uGlossiness', [material.getGlossiness()]);

                } else if (material instanceof RawMaterial) {

                    engine.uniform('uMaterialType', [1]);

                    if (material.getSource() === Material.COLOR) {
                        engine.uniform('uMaterialDiffuseTextureFlag', [Number(false)]);
                    } else {
                        engine.uniform('uMaterialDiffuseTextureFlag', [Number(true)]);
                    }

                    engine.uniform('uDiffuseColor', material.getColor());
                    engine.uniform('uDiffuseTexture', material.texture.getTexture());

                }

                engine.uniform('uMaterialOpacity', [material.getOpacity()]);

                engine.uniform('uMaterialOffset', material.getOffset());

                if (material.getOpacity() < 1) {
                    engine.enableBlend();
                    engine.disableDepthMask();
                } else {
                    engine.enableDepthMask();
                    engine.disableBlend();
                }

                const geometryBuffers = mesh.geometry.getBuffers();
                engine.elements(geometryBuffers.indices[key]);

                if (mesh instanceof LineMesh) {
                    engine.lineWidth(mesh.lineWidth);
                    engine.draw(geometryBuffers.indicesLength[key], {
                        lines: true
                    });
                } else {
                    engine.draw(geometryBuffers.indicesLength[key]);
                }
            }
        }
    }

    renderPickingLayer(groups) {

        const { scene } = this;
        const { engine } = scene;

        engine.useProgram('picker');

        engine.bindFramebuffer('picker');

        engine.uniform('uVMatrix', scene.activeCamera.getVMatrix());
        engine.uniform('uPMatrix', scene.activeCamera.getPMatrix());

        engine.clearColorBuffer({ r: 0, g: 0, b: 0, a: 1 });

        groups.forEach(meshes => {

            engine.clearDepthBuffer();

            meshes.filter(m => m.getPickable()).forEach((mesh) => {
                this.renderMeshPickingLayer(mesh);
            });
        })

        engine.bindFramebuffer(null);

    }

    renderMeshPickingLayer(mesh) {

        const { scene } = this;
        const { engine } = scene;

        engine.uniform('uMMatrix', mesh.getWorldMatrix());

        if (mesh instanceof MorphTargetMesh) {
            const { before, after, phase } = mesh.getMorphPhaseInfo();
            const gBuffer1 = mesh.morphTargetsGeometries[before].getBuffers();
            const gBuffer2 = mesh.morphTargetsGeometries[after].getBuffers();
            engine.uniform('uMorphTargetFlag', [true]);
            engine.attribute('aPosition', gBuffer1.vertices);
            engine.attribute('aPosition2', gBuffer2.vertices);
            engine.uniform('uMorphPhase', [phase]);
        } else if (mesh instanceof Mesh || mesh instanceof LineMesh) {
            const geometryBuffers = mesh.geometry.getBuffers();
            engine.uniform('uMorphTargetFlag', [false]);
            engine.attribute('aPosition', geometryBuffers.vertices);
            engine.attribute('aPosition2', geometryBuffers.vertices);
            engine.uniform('uMorphPhase', [0]);
        }

        engine.uniform('meshId', [mesh.id]);

        {
            const materials = mesh.materials;

            for (let key in materials) {
                const material = materials[key];

                const geometryBuffers = mesh.geometry.getBuffers();
                engine.elements(geometryBuffers.indices[key]);

                if (mesh instanceof LineMesh) {
                    engine.lineWidth(mesh.lineWidth);
                    engine.draw(geometryBuffers.indicesLength[key], {
                        lines: true
                    });
                } else {
                    engine.draw(geometryBuffers.indicesLength[key]);
                }
            }
        }
    }

}

export default RenderManager;