export interface ICanvas {
    width: number;
    height: number;
    getContext: (type: '2d' | 'webgl', options: any) => IWebGLRenderingContext;
}

export type IWebGLEnum = number;

export interface IWebGLRenderingContext {

    readonly FRAGMENT_SHADER: IWebGLEnum;
    readonly VERTEX_SHADER: IWebGLEnum;
    readonly HIGH_FLOAT: IWebGLEnum;
    readonly MEDIUM_FLOAT: IWebGLEnum;
    readonly LOW_FLOAT: IWebGLEnum;
    readonly HIGH_INT: IWebGLEnum;
    readonly MEDIUM_INT: IWebGLEnum;
    readonly LOW_INT: IWebGLEnum;
    readonly DEPTH_TEST: IWebGLEnum;
    readonly UNPACK_FLIP_Y_WEBGL: IWebGLEnum;
    readonly COLOR_BUFFER_BIT: IWebGLEnum;
    readonly DEPTH_BUFFER_BIT: IWebGLEnum;
    readonly BLEND: IWebGLEnum;
    readonly ZERO: IWebGLEnum;
    readonly ONE: IWebGLEnum;
    readonly SRC_COLOR: IWebGLEnum;
    readonly ONE_MINUS_SRC_COLOR: IWebGLEnum;
    readonly DST_COLOR: IWebGLEnum;
    readonly ONE_MINUS_DST_COLOR: IWebGLEnum;
    readonly SRC_ALPHA: IWebGLEnum;
    readonly ONE_MINUS_SRC_ALPHA: IWebGLEnum;
    readonly DST_ALPHA: IWebGLEnum;
    readonly ONE_MINUS_DST_ALPHA: IWebGLEnum;
    readonly CONSTANT_COLOR: IWebGLEnum;
    readonly ONE_MINUS_CONSTANT_COLOR: IWebGLEnum;
    readonly CONSTANT_ALPHA: IWebGLEnum;
    readonly ONE_MINUS_CONSTANT_ALPHA: IWebGLEnum;
    readonly SRC_ALPHA_SATURATE: IWebGLEnum;
    readonly CULL_FACE: IWebGLEnum;
    readonly FRAMEBUFFER: IWebGLEnum;
    readonly ELEMENT_ARRAY_BUFFER: IWebGLEnum;
    readonly ARRAY_BUFFER: IWebGLEnum;
    readonly RGBA: IWebGLEnum;
    readonly UNSIGNED_BYTE: IWebGLEnum;
    readonly COMPILE_STATUS: IWebGLEnum;
    readonly LINK_STATUS: IWebGLEnum;
    readonly ACTIVE_ATTRIBUTES: IWebGLEnum;
    readonly ACTIVE_UNIFORMS: IWebGLEnum;
    TEXTURE_2D: IWebGLEnum;
    TEXTURE_CUBE_MAP: IWebGLEnum;
    TEXTURE0: IWebGLEnum;
    TEXTURE1: IWebGLEnum;
    TEXTURE2: IWebGLEnum;
    TEXTURE3: IWebGLEnum;
    TEXTURE4: IWebGLEnum;
    TEXTURE5: IWebGLEnum;
    TEXTURE6: IWebGLEnum;
    TEXTURE7: IWebGLEnum;
    TEXTURE_WRAP_S: IWebGLEnum;
    TEXTURE_WRAP_T: IWebGLEnum;
    REPEAT: IWebGLEnum;
    CLAMP_TO_EDGE: IWebGLEnum;
    TEXTURE_MIN_FILTER: IWebGLEnum;
    TEXTURE_MAG_FILTER: IWebGLEnum;
    LINEAR: IWebGLEnum;
    FLOAT: IWebGLEnum;
    COLOR_ATTACHMENT0: IWebGLEnum;
    COLOR_ATTACHMENT1: IWebGLEnum;
    COLOR_ATTACHMENT2: IWebGLEnum;
    COLOR_ATTACHMENT3: IWebGLEnum;
    COLOR_ATTACHMENT4: IWebGLEnum;
    COLOR_ATTACHMENT5: IWebGLEnum;
    COLOR_ATTACHMENT6: IWebGLEnum;
    COLOR_ATTACHMENT7: IWebGLEnum;
    RENDERBUFFER: IWebGLEnum;
    DEPTH_COMPONENT16: IWebGLEnum;
    DEPTH_ATTACHMENT: IWebGLEnum;
    FRAMEBUFFER_COMPLETE: IWebGLEnum;
    TEXTURE_CUBE_MAP_POSITIVE_X: IWebGLEnum;
    TEXTURE_CUBE_MAP_NEGATIVE_X: IWebGLEnum;
    TEXTURE_CUBE_MAP_POSITIVE_Y: IWebGLEnum;
    TEXTURE_CUBE_MAP_NEGATIVE_Y: IWebGLEnum;
    TEXTURE_CUBE_MAP_POSITIVE_Z: IWebGLEnum;
    TEXTURE_CUBE_MAP_NEGATIVE_Z: IWebGLEnum;
    LINEAR_MIPMAP_LINEAR: IWebGLEnum;
    STATIC_DRAW: IWebGLEnum;

    getExtension(name: string): any;
    getShaderPrecisionFormat(shaderType: IWebGLEnum, precisionType: IWebGLEnum): IWebGLShaderPrecisionFormat;
    viewport(x: number, y: number, w: number, h: number): void;
    enable(cap: IWebGLEnum): void;
    disable(cap: IWebGLEnum): void;
    pixelStorei(pname: IWebGLEnum, param: boolean): void;
    clearColor(red: number, green: number, blue: number, alpha: number): void;
    clear(cap: IWebGLEnum): void;
    useProgram(program: IWebGLProgram): void;
    depthMask(flag: boolean): void;
    blendFunc(sfactor: IWebGLEnum, dfactor: IWebGLEnum): void;
    cullFace(cap: IWebGLEnum): void;
    bindFramebuffer(target: IWebGLEnum, framebuffer: IWebGlFramebuffer): void;
    lineWidth(width: number): void;
    bindBuffer(target: IWebGLEnum, buffer: IWebGLBuffer): void;
    drawElements(mode: IWebGLEnum, count: number, type: IWebGLEnum, offset: number): void;
    readPixels(x: number, y: number, width: number, height: number, format: IWebGLEnum, type: IWebGLEnum, pixels: Float32Array | Uint8Array | Uint16Array): void;
    createShader(type: IWebGLEnum): IWebGLShader;
    shaderSource(shader: IWebGLShader, source: string): void;
    compileShader(shader: IWebGLShader): void;
    getShaderParameter(shader: IWebGLShader, cap: IWebGLEnum): any;
    getShaderInfoLog(shader: IWebGLShader): string;
    createProgram(): IWebGLProgram;
    attachShader(program: IWebGLProgram, shader: IWebGLShader): void;
    linkProgram(program: IWebGLProgram): void;
    getProgramParameter(program: IWebGLProgram, cap: IWebGLEnum): any;
    getProgramInfoLog(program: IWebGLProgram): any;
    getActiveAttrib(program: IWebGLProgram, index: number): IWebGLActiveInfo;
    getAttribLocation(program: IWebGLProgram, name: string): number;
    getActiveUniform(program: IWebGLProgram, index: number): IWebGLActiveInfo;
    getUniformLocation(program: IWebGLProgram, name: string): number;
    deleteProgram(program: IWebGLProgram): void;
    activeTexture(unit: IWebGLEnum): void;
    bindTexture(target: IWebGLEnum, texture: IWebGLTexture): void;
    uniform1i(position: number, unit: number): void;
    vertexAttribPointer(index: number, size: number, type: IWebGLEnum, normalized: boolean, stride: number, offset: number): void;
    enableVertexAttribArray(index: number): void;
    createTexture(): IWebGLTexture;
    texParameteri(target: IWebGLEnum, pname: IWebGLEnum, param: IWebGLEnum): void;
    texImage2D(target: IWebGLEnum, level: number, internalformat: IWebGLEnum, width: number, height: number, border: number, format: IWebGLEnum, type: IWebGLEnum, pixels: any): void;
    texImage2D(target: IWebGLEnum, level: number, internalformat: IWebGLEnum, format: IWebGLEnum, type: IWebGLEnum, pixels: any): void;
    generateMipmap(target: IWebGLEnum): void;
    deleteTexture(texture: IWebGLTexture): void;
    createFramebuffer(): IWebGlFramebuffer;
    framebufferTexture2D(target: IWebGLEnum, attachment: IWebGLEnum, textarget: IWebGLEnum, texture: IWebGLTexture, level: number): void;
    createRenderbuffer(): IWebGLRenderBuffer;
    bindRenderbuffer(target: IWebGLEnum, renderbuffer: IWebGLRenderBuffer): void;
    renderbufferStorage(target: IWebGLEnum, internalFormat: IWebGLEnum, width: number, height: number): void;
    framebufferRenderbuffer(target: IWebGLEnum, attachment: IWebGLEnum, renderbuffertarget: IWebGLEnum, renderbuffer: IWebGLRenderBuffer): void;
    checkFramebufferStatus(target: IWebGLEnum): IWebGLEnum;
    deleteRenderbuffer(renderbuffer: IWebGLRenderBuffer): void;
    deleteFramebuffer(framebuffer: IWebGlFramebuffer): void;
    createBuffer(): IWebGLBuffer;
    bufferData(target: IWebGLEnum, data: Float32Array | Uint32Array, usage: IWebGLEnum): void;
    deleteBuffer(buffer: IWebGLBuffer): void;

}

export interface IWebGLTexture {
}

export interface IWebGLBuffer {
}

export interface IWebGLRenderBuffer { }

export interface IWebGLShaderPrecisionFormat {
    rangeMin: number;
    rangeMax: number;
    precision: number;
}

export interface IWebGLProgram {
}

export interface IWebGlFramebuffer {
}

export interface IWebGLShader {
}

export interface IWebGLActiveInfo {
    readonly name: string;
    readonly size: number;
    readonly type: string;
}

export interface IWebGLTexture {
}