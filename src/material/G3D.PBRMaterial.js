class PBRMaterial extends Material {

    albedoColor = { r: 0, g: 0, b: 0 };

    albedoTexture = new Texture(this);

    albedoSource = Material.COLOR;

    metallic = 0.0;

    roughness = 0.1;

    useEnvMap = false;

    envMapTexture = new Texture();

    diffuseMapTexture = new CubeTexture();

    specularMapTexture = new CubeTexture();

    brdfLUTTexture = new Texture();

    mesh = null;

    constructor(mesh) {
        super();
        this.mesh = mesh;

        const image = new Env.Image();
        image.crossOrigin = true;
        image.src = 'https://img.alicdn.com/tfs/TB1yCjuoDtYBeNjy1XdXXXXyVXa-256-256.png';
        image.onload = () => {
            this.brdfLUTTexture.image = image;
        }
    }

    getAlbedoColor() {
        const { albedoColor: c } = this;
        return [c.r / 255, c.g / 255, c.b / 255];
    }

    getAlbedoSource() {
        return this.albedoSource;
    }

    getMetallic() {
        return this.metallic;
    }

    getRoughness() {
        return this.roughness;
    }

}

export default PBRMaterial;