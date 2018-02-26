class RawMaterial extends Material {

    color = DirtyCheck(['r', 'g', 'b'], 'isDirty', this)({ r: 255, g: 255, b: 255 });
    texture = new Texture(this);
    source = Material.COLOR;

    mesh = null;

    constructor(mesh){
        super();
        this.mesh = mesh;
    }

    getSource() {
        return this.source;
    }

    @DirtyCache('isDirty')
    getColor() {
        return Vec3.fromValues(this.color.r / 255, this.color.g / 255, this.color.b / 255);
    }
}

export default RawMaterial;