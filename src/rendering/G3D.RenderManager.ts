import Env from '../core/G3D.Env';
import Engine from '../core/G3D.Engine';
import GL from '../core/G3D.GL';

import PhongMaterial from '../material/G3D.PhongMaterial2';
import PBRMaterial from '../material/G3D.PBRMaterial';
import GemMaterial from '../material/G3D.GemMaterial';

import AmbientLight from '../light/G3D.AmbientLight';
import PointLight from '../light/G3D.PointLight';
import DirectionalLight from '../light/G3D.DirectionalLight';

import Geometry from '../geometry/G3D.Geometry';
import Scene from '../scene/G3D.Scene';

import { find } from '../utils/lodash';

const LIGHT_MAX_COUNT = 16;
const LIGHT_TYPE_NULL = 1;
const LIGHT_TYPE_AMBIENT = 2;
const LIGHT_TYPE_DIRECTIONAL = 3;
const LIGHT_TYPE_POINT = 4;

class RenderManager {

    scene: Scene = null;

    private lights: {
        // type: Uint32Array,
        type: number[];
        color: Float32Array;
        intensity: Float32Array;
        position: Float32Array;
    } = {
            // type: new Uint32Array(LIGHT_MAX_COUNT),
            type: [],
            color: new Float32Array(LIGHT_MAX_COUNT * 3),
            intensity: new Float32Array(LIGHT_MAX_COUNT),
            position: new Float32Array(LIGHT_MAX_COUNT * 3)
        };

    constructor(scene: Scene) {
        this.scene = scene;
    }

    private groupMeshLayers() {

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

    private renderToScreen(groups) {

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

                this.setFaceCull(mesh.geometry.facing);

                mesh.geometry.bufferViews.indices &&
                    Object.keys(mesh.geometry.bufferViews.indices).forEach(key => {

                        const material = mesh.materials[key];

                        if (false) {

                            // engine.useProgram(
                            //     'phong',
                            //     [...material.getDefines(), ...globalDefines]
                            // );

                            // this.prepareMVPMatrix(mesh);

                            // this.prepareLights();

                            // this.prepareGeometry(mesh.geometry);

                            // this.preparePhongMaterial(material);

                            // this.prepareShadow();

                            // this.drawMesh(mesh, key);

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

                        } else if (material instanceof GemMaterial) {

                            engine.useProgram(
                                'gem',
                                [...material.getDefines(), ...globalDefines]
                            );

                            this.prepareMVPMatrix(mesh);

                            this.prepareGeometry(mesh.geometry);

                            this.prepareGemMaterial(material);

                            // the first draw (back)

                            this.setFaceCull(mesh.geometry.facing === Geometry.FACING.FRONT ? Geometry.FACING.BACK : Geometry.FACING.FRONT);

                            engine.uniform('uCullBack', [true]);

                            engine.disableDepthTest();

                            engine.disableBlend();

                            this.drawMesh(mesh, key);

                            // the second draw (front)

                            this.setFaceCull(mesh.geometry.facing);

                            engine.uniform('uCullBack', [false]);

                            engine.enableDepthTest();

                            engine.enableBlend();

                            GL.gl.blendFunc(GL.gl.ONE, GL.gl.ONE);

                            this.drawMesh(mesh, key);

                            engine.disableBlend();

                        } else {

                            engine.useProgram(
                                material.program.define(
                                    [...material.getDefines(), ...globalDefines]
                                )
                            );

                            this.prepareMVPMatrix(mesh);

                            this.prepareGeometry(mesh.geometry);


                            this.prepareMaterial(material);

                            if (material.lighting) {
                                this.prepareLights();
                            }

                            if (material.shadow) {
                                this.prepareShadow();
                            }

                            this.drawMesh(mesh, key);
                        }
                    })
            })
        });

    }


    private renderToPickerRenderBuffer(groups) {

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

    private renderToShadowRenderBuffer(groups) {

        const { scene } = this;
        const { lights } = scene;

        const engine = Engine.instance;

        const shadowLight = find(lights, light => light.castShadow);

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

    private setFaceCull = (facing) => {

        Engine.instance.cullFace(
            facing === Geometry.FACING.FRONT ? 'BACK' : facing === Geometry.FACING.BACK ? 'FRONT' : false
        );
    }

    private prepareMVPMatrix = (mesh, camera = this.scene.activeCamera) => {

        const engine = Engine.instance;

        engine.uniform('uVMatrix', camera.getVMatrix());
        engine.uniform('uPMatrix', camera.getPMatrix());
        engine.uniform('uMMatrix', mesh.getWorldMatrix());
    }

    private prepareLights() {

        const { scene } = this;
        const engine = Engine.instance;

        const { lights } = scene;

        const { lights: { type, color, intensity, position } } = this;

        if (lights.length > 16) {
            throw new Error('[G3D] Scene could not have more than 16 lights.');
        }
        for (let i = 0; i < LIGHT_MAX_COUNT; i++) {
            const light = lights[i];

            const lColor = light ? light.getColor().map(c => c / 255) : [0, 0, 0];
            const lIntensity = light ? light.getIntensity() : 0;
            let lPosition;

            if (light instanceof DirectionalLight) {
                type[i] = LIGHT_TYPE_DIRECTIONAL;
                lPosition = light.getDirection();
            } else if (light instanceof AmbientLight) {
                type[i] = LIGHT_TYPE_AMBIENT;
                lPosition = [0, 0, 0];
            } else if (light instanceof PointLight) {
                type[i] = LIGHT_TYPE_POINT;
                lPosition = light.getPosition();
            } else {
                type[i] = LIGHT_TYPE_NULL;
                lPosition = [0, 0, 0];
            }

            color[i * 3] = lColor[0];
            color[i * 3 + 1] = lColor[1];
            color[i * 3 + 2] = lColor[2];
            intensity[i] = lIntensity;
            position[i * 3] = lPosition[0];
            position[i * 3 + 1] = lPosition[1];
            position[i * 3 + 2] = lPosition[2];
        }

        engine.uniform('uLightType', type);
        engine.uniform('uLightColor', color);
        engine.uniform('uLightIntensity', intensity);
        engine.uniform('uLightPosition', position);
    }

    private prepareGeometry = (geometry) => {

        const engine = Engine.instance;

        const { vertices, uvs, normals } = geometry.bufferViews;

        if (!vertices) {
            return;
        }

        engine.attribute('aPosition', vertices.buffer.glBuffer, vertices.byteStride, vertices.byteOffset);

        if (uvs) {

            if (typeof uvs.byteStride === 'number') {

                engine.attribute('aUV', uvs.buffer.glBuffer, uvs.byteStride, uvs.byteOffset);

            } else {

                Object.keys(uvs).forEach(key => {
                    engine.attribute(key, uvs[key].buffer.glBuffer, uvs[key].byteStride, uvs[key].byteOffset);
                })

            }
        }

        if (normals) {
            engine.attribute('aNormal', normals.buffer.glBuffer, normals.byteStride, normals.byteOffset);
        }

    }

    private prepareMaterial(material) {

        const engine = Engine.instance;

        const { uniforms } = material;

        for (let i = 0; i < uniforms.length; i++) {
            const name = uniforms[i];
            const value = material.uniform(name);
            if (value !== null) {
                engine.uniform(name, value);
            }
        }

    }

    private prepareRawMaterial(material) {

        const engine = Engine.instance;

        engine.uniform('uColor', material.getColor());
        if (material.texture) {
            engine.uniform('uTexture', material.texture.glTexture);
        }

    }

    private preparePhongMaterial(material) {

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

    private preparePBRMaterial(material) {

        const engine = Engine.instance;
        const { activeCamera } = this.scene;

        engine.uniform('uCameraPosition', activeCamera.getPosition());

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

        engine.uniform('uGreyness', [material.pbrEnviroment.greyness]);

    }

    private prepareGemMaterial(material) {

        const engine = Engine.instance;

        const { activeCamera } = this.scene;

        engine.uniform('uCameraPos', activeCamera.getPosition());

        engine.uniform('uRefractionMap', material.refractionCubeMap.glTexture);

        engine.uniform('uEnvMap', material.envCubeMap.glTexture);

    }

    private prepareShadow() {

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

    private drawMesh = (mesh, key) => {

        const engine = Engine.instance;

        const { indices } = mesh.geometry.bufferViews;

        if (indices && indices[key]) {

            engine.elements(indices[key].buffer.glBuffer);

            engine.draw(indices[key].mode, indices[key].count, indices[key].type, indices[key].byteOffset);
        }
    }

    private drawSkybox() {

        const engine = Engine.instance;

        const { scene } = this;

        const skybox = scene.skybox;
        const camera = scene.activeCamera;

        engine.useProgram('skybox');

        this.setFaceCull(skybox.geometry.facing);

        const { vertices, indices } = skybox.geometry.bufferViews;

        engine.attribute('aPosition', vertices.buffer.glBuffer, vertices.byteStride, vertices.byteOffset);

        engine.uniform('uVMatrix', camera.getVMatrix());
        engine.uniform('uPMatrix', camera.getPMatrix());
        engine.uniform('uCubeTexture', skybox.cubeTexture.glTexture);

        for (let key in indices) {
            engine.elements(indices[key].buffer.glBuffer);
            engine.draw(indices[key].mode, indices[key].count, indices[key].type, indices[key].byteOffset);
        }
    }
}

export default RenderManager;