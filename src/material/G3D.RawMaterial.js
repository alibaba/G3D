@Lazy(
    ['color', 'color.r', 'color.g', 'color.b'],
    ['getColor']
)
class RawMaterial extends Material {

    color = { r: 255, g: 255, b: 255 };
    texture = new Texture(this);
    source = Material.COLOR;

    mesh = null;

    constructor(mesh) {
        super();
        this.mesh = mesh;
    }

    getSource() {
        return this.source;
    }

    getColor() {
        return Vec3.fromValues(this.color.r / 255, this.color.g / 255, this.color.b / 255);
    }
}

export default RawMaterial;