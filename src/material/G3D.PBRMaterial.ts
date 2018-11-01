import Material from './G3D.Material';
import { IColorRGB } from '../types/raw';
import Texture from '../texture/G3D.Texture';

import PBREnviroment from './G3D.PBREnviroment';
import Vec3, { IVec3 } from '../matrix/G3D.Vec3';


class PBRMaterial extends Material {

    albedoColor: IColorRGB = { r: 0, g: 0, b: 0 };

    albedoTexture: Texture;

    metallic: number = 0.0;

    roughness: number = 0.1;

    metallicRoughnessTexture: Texture;

    emissiveTexture: Texture;

    normalTexture: Texture;

    pbrEnviroment: PBREnviroment;

    private albedoColorValues: IVec3 = Vec3.create();

    constructor() {
        super();
    }

    getDefines(): string[] {
        const defines = [];

        if (this.albedoTexture) {
            defines.push('PBR_ALBEDO_TEXTURE');
        }

        if (this.metallicRoughnessTexture) {
            defines.push('PBR_METALLIC_ROUGHNESS_TEXTURE');
        }

        if (this.emissiveTexture) {
            defines.push('PBR_EMISSIVE_TEXTURE');
        }

        if (this.normalTexture) {
            defines.push('PBR_NORMAL_TEXTURE');
        }

        return defines;
    }

    getAlbedoColor(): IVec3 {

        Vec3.set(this.albedoColorValues, this.albedoColor.r / 255, this.albedoColor.g / 255, this.albedoColor.b / 255);

        return this.albedoColorValues;
    }

    getMetallic(): number {
        return this.metallic;
    }

    getRoughness(): number {
        return this.roughness;
    }

}

export default PBRMaterial;