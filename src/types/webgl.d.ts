export interface ICanvas {
    width: number;
    height: number;
    getContext: (type: '2d' | 'webgl', options: any) => IWebGLRenderingContext;
}

export type IWebGLEnum = number;

export interface IWebGLRenderingContext {

    FRAGMENT_SHADER: IWebGLEnum;
    HIGH_FLOAT: IWebGLEnum;
    MEDIUM_FLOAT: IWebGLEnum;
    LOW_FLOAT: IWebGLEnum;
    HIGH_INT: IWebGLEnum;
    MEDIUM_INT: IWebGLEnum;
    LOW_INT: IWebGLEnum;
    DEPTH_TEST: IWebGLEnum;
    UNPACK_FLIP_Y_WEBGL: IWebGLEnum;
    COLOR_BUFFER_BIT: IWebGLEnum;
    DEPTH_BUFFER_BIT: IWebGLEnum;
    BLEND: IWebGLEnum;
    ZERO: IWebGLEnum;
    ONE: IWebGLEnum;
    SRC_COLOR: IWebGLEnum;
    ONE_MINUS_SRC_COLOR: IWebGLEnum;
    DST_COLOR: IWebGLEnum;
    ONE_MINUS_DST_COLOR: IWebGLEnum;
    SRC_ALPHA: IWebGLEnum;
    ONE_MINUS_SRC_ALPHA: IWebGLEnum;
    DST_ALPHA: IWebGLEnum;
    ONE_MINUS_DST_ALPHA: IWebGLEnum;
    CONSTANT_COLOR: IWebGLEnum;
    ONE_MINUS_CONSTANT_COLOR: IWebGLEnum;
    CONSTANT_ALPHA: IWebGLEnum;
    ONE_MINUS_CONSTANT_ALPHA: IWebGLEnum;
    SRC_ALPHA_SATURATE: IWebGLEnum;
    CULL_FACE: IWebGLEnum;
    FRAMEBUFFER: IWebGLEnum;
    ELEMENT_ARRAY_BUFFER: IWebGLEnum;
    ARRAY_BUFFER: IWebGLEnum;
    RGBA: IWebGLEnum;
    UNSIGNED_BYTE: IWebGLEnum;

    getExtension: (name: string) => any;
    getShaderPrecisionFormat: (shaderType: IWebGLEnum, precisionType: IWebGLEnum) => IWebGLShaderPrecisionFormat;
    viewport: (x: number, y: number, w: number, h: number) => void;
    enable: (cap: IWebGLEnum) => void;
    disable: (cap: IWebGLEnum) => void;
    pixelStorei: (pname: IWebGLEnum, param: boolean) => void;
    clearColor: (red: number, green: number, blue: number, alpha: number) => void;
    clear: (cap: IWebGLEnum) => void;
    useProgram: (program: IWebGLProgram) => void;
    depthMask: (flag: boolean) => void;
    blendFunc: (sfactor: IWebGLEnum, dfactor: IWebGLEnum) => void;
    cullFace: (cap: IWebGLEnum) => void;
    bindFramebuffer(target: IWebGLEnum, framebuffer: IWebGlFramebuffer);
    lineWidth: (width: number) => void;
    bindBuffer: (target: IWebGLEnum, buffer: IWebGLBuffer) => void;
    drawElements: (mode: IWebGLEnum, count: number, type: IWebGLEnum, offset: number) => void;
    readPixels: (x: number, y: number, width: number, height: number, format: IWebGLEnum, type: IWebGLEnum, pixels: Float32Array | Uint8Array | Uint16Array) => void;

}

export interface IWebGLBuffer {

}

export interface IWebGLShaderPrecisionFormat {
    rangeMin: number;
    rangeMax: number;
    precision: number;
}

export interface IWebGLProgram {

}

export interface IWebGlFramebuffer {

}