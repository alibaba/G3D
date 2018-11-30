import ShaderMaterial from "./shader-material";

import Vec3, { IVec3 } from "../matrix/vec3";
import Texture from "../texture/texture";
import { IColorRGB } from "../types/raw";

import * as fragmentShaderSource from "../shaders/material-phong.frag.glsl";
import * as vertexShaderSource from "../shaders/material-phong.vert.glsl";

class PhongMaterial extends ShaderMaterial {

    public ambientColor: IColorRGB = { r: 255, g: 255, b: 255 };
    public ambientTexture: Texture;

    public diffuseColor: IColorRGB = { r: 255, g: 255, b: 255 };
    public diffuseTexture: Texture;

    public specularColor: IColorRGB = { r: 255, g: 255, b: 255 };
    public specularTexture: Texture;
    public glossiness: number = 1.0;

    public specularEnvMapTexture: Texture;

    private ambientColorValues: IVec3 = Vec3.create();
    private diffuseColorValues: IVec3 = Vec3.create();
    private specularColorValues: IVec3 = Vec3.create();
    private glossinessValue: Float32Array = new Float32Array([0]);

    constructor() {

        super({
            name: "G3D_PHONG",
            vertexShaderSource, fragmentShaderSource,
            macros: [
                "PHONG_TEXTURE",
                "PHONG_AMBIENT_TEXTURE",
                "PHONG_DIFFUSE_TEXTURE",
                "PHONG_SPECULAR_TEXTURE",
                "PHONG_SPECULAR_ENV_MAP_TEXTURE",
            ],
            uniforms: [
                "uAmbientColor",
                "uAmbientTexture",
                "uDiffuseColor",
                "uDiffuseTexture",
                "uSpecularColor",
                "uSpecularTexture",
                "uGlossiness",
                "uSpecularEnvMapTexture",
            ],
            lighting: true,
            shadow: true,
        });

    }

    public condition(name: string): boolean {

        switch (name) {
            case "PHONG_AMBIENT_TEXTURE":
                return !!this.ambientTexture;
            case "PHONG_DIFFUSE_TEXTURE":
                return !!this.diffuseTexture;
            case "PHONG_SPECULAR_TEXTURE":
                return !!this.specularTexture;
            case "PHONG_TEXTURE":
                return !!this.ambientTexture || !!this.diffuseTexture || !!this.specularTexture;
            case "PHONG_SPECULAR_ENV_MAP_TEXTURE":
                return !!this.specularEnvMapTexture;
            default:
                return super.condition(name);
        }
    }

    public uniform(name: string): Float32Array | WebGLTexture {

        switch (name) {
            case "uAmbientColor":
                return this.getAmbientColor();
            case "uAmbientTexture":
                return this.getAmbientTexture();
            case "uDiffuseColor":
                return this.getDiffuseColor();
            case "uDiffuseTexture":
                return this.getDiffuseTexture();
            case "uSpecularColor":
                return this.getSpecularColor();
            case "uSpecularTexture":
                return this.getSpecularTexture();
            case "uGlossiness":
                return this.getGlossiness();
            case "uSpecularEnvMapTexture":
                return this.getSpecularEnvMapTexture();
            default:
                return super.uniform(name);
        }

    }

    private getAmbientColor(): IVec3 {
        Vec3.set(this.ambientColorValues, this.ambientColor.r / 255, this.ambientColor.g / 255, this.ambientColor.b / 255);
        return this.ambientColorValues;
    }

    private getAmbientTexture(): WebGLTexture {
        if (this.ambientTexture) {
            return this.ambientTexture.glTexture;
        } else {
            return null;
        }
    }

    private getDiffuseColor(): IVec3 {

        Vec3.set(this.diffuseColorValues, this.diffuseColor.r / 255, this.diffuseColor.g / 255, this.diffuseColor.b / 255);

        return this.diffuseColorValues;
    }

    private getDiffuseTexture(): WebGLTexture {
        if (this.diffuseTexture) {
            return this.diffuseTexture.glTexture;
        } else {
            return null;
        }
    }

    private getSpecularColor(): IVec3 {

        Vec3.set(this.specularColorValues, this.specularColor.r / 255, this.specularColor.g / 255, this.specularColor.b / 255);

        return this.specularColorValues;
    }

    private getSpecularTexture(): WebGLTexture {
        if (this.specularTexture) {
            return this.specularTexture.glTexture;
        } else {
            return null;
        }
    }

    private getSpecularEnvMapTexture(): WebGLTexture {
        if (this.specularEnvMapTexture) {
            return this.specularEnvMapTexture.glTexture;
        } else {
            return null;
        }
    }

    private getGlossiness(): Float32Array {
        this.glossinessValue[0] = this.glossiness;
        return this.glossinessValue;
    }

}

export default PhongMaterial;
