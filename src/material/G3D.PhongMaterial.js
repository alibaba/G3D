class PhongMaterial extends Material {

    ambientColor = { r: 255, g: 255, b: 255 };
    ambientTexture = null;

    diffuseColor = { r: 255, g: 255, b: 255 };
    diffuseTexture = null;

    specularColor = { r: 255, g: 255, b: 255 };
    specularTexture = null;
    glossiness = 1.0;

    specularEnvMapTexture = null;

    constructor() {
        super();
    }

    getDefines() {
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

    getAmbientColor() {

        if (!this._ambientColorValues) {
            this._ambientColorValues = new Float32Array(3);
        }

        const values = this._ambientColorValues;

        values[0] = this.ambientColor.r / 255;
        values[1] = this.ambientColor.g / 255;
        values[2] = this.ambientColor.b / 255;

        return values;
    }

    getDiffuseColor() {

        if (!this._diffuseColorValues) {
            this._diffuseColorValues = new Float32Array(3);
        }

        const values = this._diffuseColorValues;

        values[0] = this.diffuseColor.r / 255;
        values[1] = this.diffuseColor.g / 255;
        values[2] = this.diffuseColor.b / 255;

        return values;
    }

    getSpecularColor() {

        if (!this._specularColorValues) {
            this._specularColorValues = new Float32Array(3);
        }

        const values = this._specularColorValues;

        values[0] = this.specularColor.r / 255;
        values[1] = this.specularColor.g / 255;
        values[2] = this.specularColor.b / 255;

        return values;

    }

    getGlossiness() {
        return this.glossiness;
    }

}

export default PhongMaterial;