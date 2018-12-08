import Engine from "../core/engine";
import GL from "../core/gl";

import AmbientLight from "../light/ambient-light";
import DirectionalLight from "../light/directional-light";
import PointLight from "../light/point-light";

import Geometry from "../geometry/geometry";
import Scene from "../scene/scene";

import { find } from "../utils/lodash";
import Mesh from "../mesh/mesh";
import LineMesh from "../mesh/line-mesh";
import BaseMesh from "../mesh/base-mesh";
import BaseCamera from "../camera/base-camera";
import BaseGeometry from "../geometry/base-geometry";
import BufferView from "../buffer/buffer-view";
import ShaderMaterial from "../material/shader-material";

const LIGHT_MAX_COUNT = 16;
const LIGHT_TYPE_NULL = 1;
const LIGHT_TYPE_AMBIENT = 2;
const LIGHT_TYPE_DIRECTIONAL = 3;
const LIGHT_TYPE_POINT = 4;

class RenderManager {

    public scene: Scene = null;

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
            position: new Float32Array(LIGHT_MAX_COUNT * 3),
        };

    private groups: BaseMesh[][] = [];

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public render(): void {

        const { scene } = this;

        const engine = Engine.instance;

        if (scene.activeCamera) {

            this.groupMeshLayers();

            engine.bindFramebuffer("picker");
            this.renderToPickerRenderBuffer();
            engine.bindFramebuffer(null);

            engine.bindFramebuffer("shadow");
            this.renderToShadowRenderBuffer();
            engine.bindFramebuffer(null);

            this.renderToScreen();
        }
    }

    private groupMeshLayers(): void {

        const { scene } = this;
        const { meshes } = scene;

        this.groups = [];

        for (const mesh of meshes) {

            const i = mesh.getRenderLayerIndex();

            if (!this.groups[i]) {
                this.groups[i] = [];
            }

            this.groups[i].push(mesh);
        }

    }

    private getShadowLight(): DirectionalLight | PointLight {
        const { scene: { lights } } = this;
        for (let i = 0; i < lights.length; i++) {
            const light = lights[i];
            if (light instanceof DirectionalLight || light instanceof PointLight) {
                if (light.castShadow) {
                    return light;
                }
            }
        }
        return null;
    }

    private renderToScreen(): void {

        const { scene, groups } = this;

        const engine = Engine.instance;

        engine.clearColorBuffer(scene.clearColor);

        if (scene.skybox) {

            engine.clearDepthBuffer();

            this.drawSkybox();
        }

        const globalDefines = [];

        if (this.getShadowLight()) {
            globalDefines.push("CAST_SHADOW");
        }

        groups.forEach((meshes) => {

            engine.clearDepthBuffer();

            meshes.filter((m) => m.getGlobalVisibility()).forEach((mesh) => {

                if (mesh.geometry.bufferViews.indices) {

                    Object.keys(mesh.geometry.bufferViews.indices).forEach((key) => {

                        const material = mesh.materials[key];

                        engine.useProgram(
                            material.getProgram(globalDefines),
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

                        if (material.camera) {
                            this.prepareCameraPosition();
                        }

                        const { passes } = material;

                        for (const i in passes) {

                            const { uniforms, depthTest, cullFace, blend } = passes[i];
                            for (const j in uniforms) {
                                const { name, value } = uniforms[j];
                                engine.uniform(name, value);
                            }

                            if (depthTest) {
                                engine.enableDepthMask();
                            } else {
                                engine.disableDepthMask();
                            }

                            if (blend) {
                                engine.enableBlend();
                                // TODO: set blend func in engine
                                GL.gl.blendFunc(GL.gl.ONE, GL.gl.ONE);
                            } else {
                                engine.disableBlend();
                            }

                            if (mesh instanceof Mesh) {
                                if (cullFace) {
                                    this.setFaceCull(mesh.geometry.facing);
                                } else {
                                    this.setFaceCull(
                                        mesh.geometry.facing === Geometry.FACING.FRONT ?
                                            Geometry.FACING.BACK : Geometry.FACING.FRONT,
                                    );
                                }
                            }

                            this.drawMesh(mesh, key);
                        }

                    });
                }
            });
        });

    }

    private renderToPickerRenderBuffer(): void {

        const { groups } = this;

        const engine = Engine.instance;

        engine.clearColorBuffer({ r: 0, g: 0, b: 0 });

        groups.forEach((meshes) => {

            engine.clearDepthBuffer();

            meshes.filter((m) => m.getPickable() && m.getGlobalVisibility()).forEach((mesh) => {

                Object.keys(mesh.materials).forEach((key) => {

                    const material = mesh.materials[key];

                    if (material) {
                        engine.useBuiltinProgram("picker");

                        this.prepareMVPMatrix(mesh);

                        this.prepareGeometry(mesh.geometry);

                        engine.uniform("meshId", [mesh.id]);

                        this.drawMesh(mesh, key);
                    }
                });
            });
        });
    }

    private renderToShadowRenderBuffer(): void {

        const { scene, groups } = this;
        const { lights } = scene;

        const engine = Engine.instance;

        const shadowLight = find(lights, (light) => light.castShadow);

        if (shadowLight) {

            const group = groups[0];

            engine.clearColorBuffer({ r: 0, g: 0, b: 0 });
            engine.clearDepthBuffer();

            const camera = shadowLight.getShadowCamera();

            group.forEach((mesh) => {

                Object.keys(mesh.geometry.bufferViews.indices).forEach((key) => {

                    const material = mesh.materials[key];

                    if (material) {

                        engine.useBuiltinProgram("shadow");

                        this.prepareMVPMatrix(mesh, camera);

                        this.prepareGeometry(mesh.geometry);

                        this.drawMesh(mesh, key);
                    }
                });
            });
        }
    }

    private setFaceCull(facing: any): void {
        Engine.instance.cullFace(
            facing === Geometry.FACING.FRONT ? "BACK" : facing === Geometry.FACING.BACK ? "FRONT" : null,
        );
    }

    private prepareMVPMatrix(mesh: BaseMesh, camera: BaseCamera = this.scene.activeCamera): void {

        const engine = Engine.instance;

        engine.uniform("uVMatrix", camera.getVMatrix());
        engine.uniform("uPMatrix", camera.getPMatrix());
        engine.uniform("uMMatrix", mesh.getWorldMatrix());
    }

    private prepareLights(): void {

        const { scene } = this;
        const engine = Engine.instance;

        const { lights } = scene;

        const { lights: { type, color, intensity, position } } = this;

        if (lights.length > 16) {
            throw new Error("[G3D] Scene could not have more than 16 lights.");
        }
        for (let i = 0; i < LIGHT_MAX_COUNT; i++) {
            const light = lights[i];

            const lColor = light ? light.getColor().map((c) => c / 255) : [0, 0, 0];
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

        engine.uniform("uLightType", type);
        engine.uniform("uLightColor", color);
        engine.uniform("uLightIntensity", intensity);
        engine.uniform("uLightPosition", position);
    }

    private prepareGeometry(geometry: BaseGeometry): void {

        const engine = Engine.instance;

        const { vertices, uvs, normals } = geometry.bufferViews;

        if (!vertices) {
            return;
        }

        engine.attribute("aPosition", vertices.buffer.glBuffer, vertices.byteStride, vertices.byteOffset);

        if (uvs) {

            if (uvs instanceof BufferView) {

                engine.attribute("aUV", uvs.buffer.glBuffer, uvs.byteStride, uvs.byteOffset);

            } else {

                Object.keys(uvs).forEach((key) => {
                    engine.attribute(key, uvs[key].buffer.glBuffer, uvs[key].byteStride, uvs[key].byteOffset);
                });

            }
        }

        if (normals) {
            engine.attribute("aNormal", normals.buffer.glBuffer, normals.byteStride, normals.byteOffset);
        }

    }

    private prepareMaterial(material: ShaderMaterial): void {

        const engine = Engine.instance;

        const { uniforms } = material;

        for (const name of uniforms) {
            const value = material.uniform(name);
            if (value !== null) {
                engine.uniform(name, value);
            }
        }
    }

    private prepareCameraPosition(): void {
        const engine = Engine.instance;
        const { activeCamera } = this.scene;
        engine.uniform("uCameraPosition", activeCamera.getPosition());
    }

    private prepareShadow(): void {

        const engine = Engine.instance;

        const shadowLight = this.getShadowLight();

        if (shadowLight) {

            const { colorTarget: shadowMapTexture } = engine.getFramebuffer("shadow");

            engine.uniform("uShadowMapTexture", shadowMapTexture);
            const shadowCamera = shadowLight.getShadowCamera();
            engine.uniform("uShadowVMatrix", shadowCamera.getVMatrix());
            engine.uniform("uShadowPMatrix", shadowCamera.getPMatrix());
        }
    }

    private drawMesh(mesh: BaseMesh, key: string): void {

        const engine = Engine.instance;

        const { indices } = mesh.geometry.bufferViews;

        if (indices && indices[key]) {

            engine.elements(indices[key].buffer.glBuffer);

            engine.draw(indices[key].mode, indices[key].count, indices[key].type, indices[key].byteOffset);
        }
    }

    private drawSkybox(): void {

        const engine = Engine.instance;

        const { scene } = this;

        const skybox = scene.skybox;
        const camera = scene.activeCamera;

        engine.useBuiltinProgram("skybox");

        this.setFaceCull(skybox.geometry.facing);

        const { vertices, indices } = skybox.geometry.bufferViews;

        engine.attribute("aPosition", vertices.buffer.glBuffer, vertices.byteStride, vertices.byteOffset);

        engine.uniform("uVMatrix", camera.getVMatrix());
        engine.uniform("uPMatrix", camera.getPMatrix());
        engine.uniform("uCubeTexture", skybox.cubeTexture.glTexture);

        for (const key in indices) {
            engine.elements(indices[key].buffer.glBuffer);
            engine.draw(indices[key].mode, indices[key].count, indices[key].type, indices[key].byteOffset);
        }
    }
}

export default RenderManager;
