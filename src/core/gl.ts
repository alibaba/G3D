import Buffer from './buffer';
import Texture from '../texture/texture';
import CubeTexture from '../texture/cube-texture';
import { IWebGLRenderingContext } from '../types/webgl';


interface IGL {

    width: number,
    height: number,

    gl: IWebGLRenderingContext,

    extensions: { [prop: string]: any },
    precisions: { float: string },

    buffers: Buffer[],
    textures: Texture[],
    cubeTextures: CubeTexture[],

}

const GL: IGL = {

    width: 0,
    height: 0,

    gl: null,

    extensions: {},
    precisions: {
        float: ''
    },

    buffers: [],
    textures: [],
    cubeTextures: [],
}

export default GL;