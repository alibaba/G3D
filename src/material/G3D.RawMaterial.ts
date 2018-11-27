import ShaderMaterial from './G3D.ShaderMaterial';

import Texture from '../texture/G3D.Texture';
import { IColorRGB } from '../types/raw';
import Vec3, { IVec3 } from '../matrix/G3D.Vec3';

import * as vShaderSource from '../shaders/material-raw.vert.glsl';
import * as fShaderSource from '../shaders/material-raw.frag.glsl';

class RawMaterial extends ShaderMaterial {

    color: IColorRGB = { r: 255, g: 255, b: 255 };
    texture: Texture;

    private colorValues: IVec3 = Vec3.create();

    constructor() {

        super({
            name: 'G3D_RAW',
            vertexShaderSource: vShaderSource,
            fragmentShaderSource: fShaderSource,
            macros: ['RAW_TEXTURE'],
            uniforms: ['uColor', 'uTexture'],
            lighting: false,
            shadow: false
        });

    }

    condition(macro: string): boolean {

        switch (macro) {
            case 'RAW_TEXTURE':
                return !!this.texture;
            default:
                return super.condition(macro);
        }

    }

    uniform(name: string): Float32Array | WebGLTexture {

        switch (name) {
            case 'uColor':
                return this.getColor();
            case 'uTexture':
                return this.getTexture();
            default:
                return null;
        }

    }

    getColor(): IVec3 {

        Vec3.set(this.colorValues, this.color.r / 255, this.color.g / 255, this.color.b / 255);
        return this.colorValues;
    }

    getTexture(): WebGLTexture {

        if (this.texture) {
            return this.texture.glTexture;
        } else {
            return null;
        }
    }
}

export default RawMaterial;