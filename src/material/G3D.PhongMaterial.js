
@Lazy(
    [
        'ambientColor', 'ambientColor.r', 'ambientColor.g', 'ambientColor.b',
        'diffuseColor', 'diffuseColor.r', 'diffuseColor.g', 'diffuseColor.b',
        'specularColor', 'specularColor.r', 'specularColor.g', 'specularColor.b'
    ],
    [
        'getAmbientColor', 'getDiffuseColor', 'getSpecularColor'
    ]
)
class PhongMaterial extends Material {

    ambientColor = { r: 255, g: 255, b: 255 };
    ambientTexture = null;

    diffuseColor = { r: 255, g: 255, b: 255 };
    diffuseTexture = null;

    specularColor = { r: 255, g: 255, b: 255 };
    specularTexture = null;

    glossiness = 1.0;

    envMapTexture = new Texture();
    envMapCubeTexture = new CubeTexture();
    useEnvMap = false;
    useCubeMap = false;

    constructor(mesh) {
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
        return defines;
    }

    getAmbientSource() {
        return this.ambientSource;
    }

    getAmbientColor() {
        return Vec3.fromValues(this.ambientColor.r / 255, this.ambientColor.g / 255, this.ambientColor.b / 255);
    }

    getDiffuseSource() {
        return this.diffuseSource;
    }

    getDiffuseColor() {
        return Vec3.fromValues(this.diffuseColor.r / 255, this.diffuseColor.g / 255, this.diffuseColor.b / 255);
    }

    getSpecularSource() {
        return this.specularSource;
    }

    getSpecularColor() {
        return Vec3.fromValues(this.specularColor.r / 255, this.specularColor.g / 255, this.specularColor.b / 255);
    }

    getGlossiness() {
        return this.glossiness;
    }

    getUseEnvMap() {
        return this.useEnvMap;
    }

    getUseCubeMap() {
        return this.useCubeMap;
    }
}

export default PhongMaterial;