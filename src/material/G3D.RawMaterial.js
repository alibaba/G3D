@Lazy(
    ['color', 'color.r', 'color.g', 'color.b'],
    ['getColor']
)
class RawMaterial extends Material {

    color = { r: 255, g: 255, b: 255 };
    texture = new Texture();
    source = Material.COLOR;

    constructor() {
        super();
    }

    getDefines() {
        const defines = [];
        if (this.source === Material.TEXTURE) {
            defines.push('RAW_TEXTURE');
        }
        return defines;
    }

    getSource() {
        return this.source;
    }

    getColor() {
        return Vec3.fromValues(this.color.r / 255, this.color.g / 255, this.color.b / 255);
    }
}

export default RawMaterial;