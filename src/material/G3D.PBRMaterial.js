class PBRMaterial extends Material {

    albedoColor = { r: 0, g: 0, b: 0 };

    albedoTexture = new Texture(this);

    albedoSource = Material.COLOR;

    metallic = false;

    roughness = 0.1;

    baseReflectivity = { r: 0.2, g: 0.2, b: 0.2 };

    mesh = null;

    constructor(mesh) {
        super();
        this.mesh = mesh;
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

    getBaseReflectivity() {
        const { baseReflectivity: r } = this;
        return [r.r, r.g, r.b];
    }

}

export default PBRMaterial;