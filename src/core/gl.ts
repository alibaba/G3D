import CubeTexture from "../texture/cube-texture";
import Texture from "../texture/texture";
import Buffer from "../buffer/buffer";
import ElementBuffer from "../buffer/element-buffer";

interface IGL {

    width: number;
    height: number;

    gl: WebGLRenderingContext;

    // extensions: { [prop: string]: any };
    extensions: Map<string, any>;
    // precisions: { float: string };
    precisions: Map<string, string>;

    buffers: Set<Buffer | ElementBuffer>;
    textures: Set<Texture | CubeTexture>;

}

const GL: IGL = {

    width: 0,
    height: 0,

    gl: null,

    extensions: new Map(),
    precisions: new Map(),

    buffers: new Set(),
    textures: new Set(),
};

export default GL;
