import CubeTexture from "../texture/cube-texture";
import Texture from "../texture/texture";
import Buffer from "../buffer/buffer";
import ElementBuffer from "../buffer/element-buffer";

interface IGL {

    width: number;
    height: number;

    gl: WebGLRenderingContext;

    extensions: { [prop: string]: any };
    precisions: { float: string };

    buffers: Set<Buffer | ElementBuffer>;
    textures: Texture[];
    cubeTextures: CubeTexture[];

}

const GL: IGL = {

    width: 0,
    height: 0,

    gl: null,

    extensions: {},
    precisions: {
        float: "",
    },

    buffers: new Set(),
    textures: [],
    cubeTextures: [],
};

export default GL;
