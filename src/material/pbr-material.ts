import ShaderMaterial from './shader-material';

import { IColorRGB } from '../types/raw';
import Texture from '../texture/texture';

import PBREnviroment from './pbr-enviroment';
import Vec3, { IVec3 } from '../matrix/vec3';

import * as vertexShaderSource from '../shaders/material-pbr.vert.glsl';
import * as fragmentShaderSource from '../shaders/material-pbr.frag.glsl';


class PBRMaterial extends ShaderMaterial {

    albedoColor: IColorRGB = { r: 0, g: 0, b: 0 };

    albedoTexture: Texture;

    metallic: number = 0.0;

    roughness: number = 0.1;

    metallicRoughnessTexture: Texture;

    emissiveTexture: Texture;

    normalTexture: Texture;

    pbrEnviroment: PBREnviroment;

    private albedoColorValues: IVec3 = Vec3.create();
    private metallicValue: Float32Array = new Float32Array([0]);
    private roughnessValue: Float32Array = new Float32Array([0]);

    constructor() {
        super({
            name: 'G3D_SHADER',
            vertexShaderSource,
            fragmentShaderSource,
            macros: [
                'PBR_NORMAL_TEXTURE',
                'PBR_ALBEDO_TEXTURE',
                'PBR_METALLIC_ROUGHNESS_TEXTURE',
                'PBR_EMISSIVE_TEXTURE',
            ],
            uniforms: [
                'uMaterialAlbedoColor',
                'uMaterialAlbedoTexture',
                'uMaterialRoughness',
                'uMaterialMetallic',
                'uMaterialMetallicRoughnessTexture',
                'uMaterialEmissiveTexture',
                'uMaterialNormalTexture',
                'uSpecularMap',
                'uSpecularMipLevel',
                'uDiffuseMap',
                'uBRDFLUT',
                'uGreyness',
            ],
            lighting: true,
            shadow: false,
            camera: true
        });
    }


    condition(name: string): boolean {

        switch (name) {
            case 'PBR_NORMAL_TEXTURE':
                return !!this.normalTexture;
            case 'PBR_ALBEDO_TEXTURE':
                return !!this.albedoTexture;
            case 'PBR_METALLIC_ROUGHNESS_TEXTURE':
                return !!this.metallicRoughnessTexture;
            case 'PBR_EMISSIVE_TEXTURE':
                return !!this.emissiveTexture;
            default:
                return super.condition(name);
        }
    }

    uniform(name: string): Float32Array | WebGLTexture {

        switch (name) {
            case 'uMaterialAlbedoColor':
                return this.getAlbedoColor();
            case 'uMaterialAlbedoTexture':
                return this.getAlbedoTexture();
            case 'uMaterialRoughness':
                return this.getRoughness();
            case 'uMaterialMetallic':
                return this.getMetallic();
            case 'uMaterialMetallicRoughnessTexture':
                return this.getMetallicRoughnessTexture();
            case 'uMaterialEmissiveTexture':
                return this.getEmissiveTexture();
            case 'uMaterialNormalTexture':
                return this.getNormalTexture();
            case 'uSpecularMap':
                return this.getSpecularMap();
            case 'uDiffuseMap':
                return this.getDiffuseMap();
            case 'uBRDFLUT':
                return this.getBRDFLUT();
            case 'uSpecularMipLevel':
                return this.getSpecularMipLevel();
            case 'uGreyness':
                return this.getGreyness();
            default:
                return super.uniform(name);
        }
    }


    private getAlbedoColor(): IVec3 {
        Vec3.set(this.albedoColorValues, this.albedoColor.r / 255, this.albedoColor.g / 255, this.albedoColor.b / 255);
        return this.albedoColorValues;
    }


    private getAlbedoTexture(): WebGLTexture {
        if (this.albedoTexture) {
            return this.albedoTexture.glTexture;
        } else {
            return null;
        }
    }

    private getMetallic(): Float32Array {
        this.metallicValue[0] = this.metallic;
        return this.metallicValue;
    }

    private getRoughness(): Float32Array {
        this.roughnessValue[0] = this.roughness;
        return this.roughnessValue;
    }

    private getMetallicRoughnessTexture(): WebGLTexture {
        if (this.metallicRoughnessTexture) {
            return this.metallicRoughnessTexture.glTexture;
        } else {
            return null;
        }
    }

    private getEmissiveTexture(): WebGLTexture {
        if (this.emissiveTexture) {
            return this.emissiveTexture.glTexture;
        } else {
            return null;
        }
    }

    private getNormalTexture(): WebGLTexture {
        if (this.normalTexture) {
            return this.normalTexture.glTexture;
        } else {
            return null;
        }
    }

    private getSpecularMap(): WebGLTexture {
        return this.pbrEnviroment.specular.glTexture;
    }

    private getSpecularMipLevel(): any {
        return [this.pbrEnviroment.specular.mipLevel];
    }

    private getDiffuseMap(): WebGLTexture {
        return this.pbrEnviroment.diffuse.glTexture;
    }

    private getBRDFLUT(): WebGLTexture {
        return this.pbrEnviroment.brdfLUT.glTexture;
    }

    private getGreyness(): Float32Array {
        return new Float32Array([this.pbrEnviroment.greyness]);
    }
}

export default PBRMaterial;