class PBRMaterial extends Material {

    albedoColor = { r: 0, g: 0, b: 0 };

    albedoTexture = new Texture(this);

    albedoSource = Material.COLOR;

    metallic = 0.0;

    roughness = 0.1;

    pbrEnviroment = new PBREnviroment();

    constructor() {
        super();
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