class StandardMaterial extends Material {

    ambientColor = DirtyCheck(['r', 'g', 'b'], 'isDirty', this)({ r: 255, g: 255, b: 255 });
    ambientTexture = new Texture(this);
    ambientSource = Material.COLOR;

    diffuseColor = DirtyCheck(['r', 'g', 'b'], 'isDirty', this)({ r: 255, g: 255, b: 255 });
    diffuseTexture = new Texture(this);
    diffuseSource = Material.COLOR;

    specularColor = DirtyCheck(['r', 'g', 'b'], 'isDirty', this)({ r: 0, g: 0, b: 0 });
    specularTexture = new Texture(this);
    specularSource = Material.COLOR;
    glossiness = 1.0;

    envMapTexture = new Texture(this);
    useEnvMap = false;

    mesh = null;

    constructor(mesh) {
        super();
        this.mesh = mesh;
    }

    getAmbientSource() {
        return this.ambientSource;
    }

    @DirtyCache('isDirty')
    getAmbientColor() {
        return Vec3.fromValues(this.ambientColor.r / 255, this.ambientColor.g / 255, this.ambientColor.b / 255);
    }

    getDiffuseSource() {
        return this.diffuseSource;
    }

    @DirtyCache('isDirty')
    getDiffuseColor() {
        return Vec3.fromValues(this.diffuseColor.r / 255, this.diffuseColor.g / 255, this.diffuseColor.b / 255);
    }

    getSpecularSource() {
        return this.specularSource;
    }

    @DirtyCache('isDirty')
    getSpecularColor() {
        return Vec3.fromValues(this.specularColor.r / 255, this.specularColor.g / 255, this.specularColor.b / 255);
    }

    getGlossiness() {
        return this.glossiness;
    }

    getUseEnvMap() {
        return this.useEnvMap;
    }
}

export default StandardMaterial;