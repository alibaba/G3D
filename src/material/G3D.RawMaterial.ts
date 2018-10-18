import Material from './G3D.Material';

class RawMaterial extends Material {

    color = { r: 255, g: 255, b: 255 };
    texture = null;

    private _colorValues = null;

    constructor() {
        super();
    }

    getDefines() {
        const defines = [];
        if (this.texture) {
            defines.push('RAW_TEXTURE');
        }
        return defines;
    }

    getColor() {

        if (!this._colorValues) {
            this._colorValues = new Float32Array(3);
        }

        const values = this._colorValues;
        values[0] = this.color.r / 255;
        values[1] = this.color.g / 255;
        values[2] = this.color.b / 255;

        return values;
    }
}

export default RawMaterial;