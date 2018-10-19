import Material from './G3D.Material';



class PBRMaterial extends Material {

    albedoColor = { r: 0, g: 0, b: 0 };

    albedoTexture = null;

    metallic = 0.0;

    roughness = 0.1;

    metallicRoughnessTexture = null;

    emissiveTexture = null;

    normalTexture = null;

    pbrEnviroment = null;

    constructor() {
        super();
    }

    getDefines() {
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

    getAlbedoColor() {
        const { albedoColor: c } = this;
        return [c.r / 255, c.g / 255, c.b / 255];
    }

    getMetallic() {
        return this.metallic;
    }

    getRoughness() {
        return this.roughness;
    }

}

export default PBRMaterial;