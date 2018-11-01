import Material from './G3D.Material';
import Vec3, { IVec3 } from '../matrix/G3D.Vec3';
import { IColorRGB } from '../types/raw';
import Texture from '../texture/G3D.Texture';

class PhongMaterial extends Material {

    ambientColor: IColorRGB = { r: 255, g: 255, b: 255 };
    ambientTexture: Texture;

    diffuseColor: IColorRGB = { r: 255, g: 255, b: 255 };
    diffuseTexture: Texture;

    specularColor: IColorRGB = { r: 255, g: 255, b: 255 };
    specularTexture: Texture;
    glossiness: number = 1.0;

    specularEnvMapTexture: Texture;

    private ambientColorValues: IVec3 = Vec3.create();
    private diffuseColorValues: IVec3 = Vec3.create();
    private specularColorValues: IVec3 = Vec3.create();

    constructor() {
        super();
    }

    getDefines(): string[] {
        const defines = [];
        if (this.ambientTexture) {
            defines.push('PHONG_AMBIENT_TEXTURE');
        }
        if (this.diffuseTexture) {
            defines.push('PHONG_DIFFUSE_TEXTURE');
        }
        if (this.specularTexture) {
            defines.push('PHONG_SPECULAR_TEXTURE');
        }
        if (this.ambientTexture || this.diffuseTexture || this.specularTexture) {
            defines.push('PHONG_TEXTURE');
        }
        if (this.specularEnvMapTexture) {
            defines.push('PHONG_SPECULAR_ENV_MAP_TEXTURE');
        }
        return defines;
    }

    getAmbientColor(): IVec3 {

        Vec3.set(this.ambientColorValues, this.ambientColor.r / 255, this.ambientColor.g / 255, this.ambientColor.b / 255);

        return this.ambientColorValues;
    }

    getDiffuseColor(): IVec3 {

        Vec3.set(this.diffuseColorValues, this.diffuseColor.r / 255, this.diffuseColor.g / 255, this.diffuseColor.b / 255);

        return this.diffuseColorValues;
    }

    getSpecularColor(): IVec3 {

        Vec3.set(this.specularColorValues, this.specularColor.r / 255, this.specularColor.g / 255, this.specularColor.b / 255);

        return this.specularColorValues;
    }

    getGlossiness(): number {
        return this.glossiness;
    }

}

export default PhongMaterial;