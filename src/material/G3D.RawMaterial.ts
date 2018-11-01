import Material from './G3D.Material';

import Texture from '../texture/G3D.Texture';
import { IColorRGB } from '../types/raw';
import Vec3, { IVec3 } from '../matrix/G3D.Vec3';

class RawMaterial extends Material {

    color: IColorRGB = { r: 255, g: 255, b: 255 };
    texture: Texture = null;

    private colorValues: IVec3 = Vec3.create();

    constructor() {
        super();
    }

    getDefines(): string[] {

        const defines = [];
        if (this.texture) {
            defines.push('RAW_TEXTURE');
        }

        return defines;
    }

    getColor(): IVec3 {

        Vec3.set(this.colorValues, this.color.r / 255, this.color.g / 255, this.color.b / 255);
        return this.colorValues;
    }
}

export default RawMaterial;