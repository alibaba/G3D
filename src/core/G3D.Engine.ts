import GL from './G3D.GL';
import Shader from './G3D.Shader';
import Framebuffer from './G3D.Framebuffer';
import { ICanvas, IWebGLEnum, IWebGLTexture, IWebGLBuffer } from '../types/webgl';
import Scene from '../scene/G3D.Scene';

import * as fShaderPicker from '../shaders/picker.frag.glsl';
import * as vShaderPicker from '../shaders/picker.vert.glsl';

import * as fShaderShadow from '../shaders/shadow.frag.glsl';
import * as vShaderShadow from '../shaders/shadow.vert.glsl';

import * as fShaderSkybox from '../shaders/skybox.frag.glsl';
import * as vShaderSkybox from '../shaders/skybox.vert.glsl';

import Program from './G3D.Program';
import { IColorRGB } from '../types/raw';

class Engine {

    currentProgram: Program;
    currentScene: Scene;

    private shaders: { [prop: string]: Shader } = {};
    private framebuffers: { [prop: string]: Framebuffer } = {};

    // TODO: remove it
    static instance: Engine = null;

    constructor(canvas: ICanvas) {

        if (Engine.instance) {
            throw new Error('Only 1 Engine instance is allowed.');
        }
        Engine.instance = this;

        GL.gl = canvas.getContext('webgl', {
            antialias: true,
            preserveDrawingBuffer: true
        });

        const { gl } = GL;

        GL.width = canvas.width as number;
        GL.height = canvas.height as number;

        // extensions
        {
            const { extensions } = GL;

            extensions.TEX_LOD = gl.getExtension('EXT_shader_texture_lod');

            // TODO : check support
            gl.getExtension('OES_standard_derivatives');
            gl.getExtension('OES_element_index_uint');

            gl.getExtension('OES_texture_float');
            gl.getExtension('OES_texture_float_linear');

            extensions.SRGB = gl.getExtension('EXT_SRGB');
        }

        // precisions
        {
            const { precisions } = GL;

            const high = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision !== 0;
            const medium = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision !== 0;

            precisions.float = high ? 'mediump' : medium ? 'mediump' : 'lowp';
        }

        // shaders
        this.shaders = {
            picker: new Shader({
                fShaderSource: fShaderPicker, vShaderSource: vShaderPicker,
            }),
            shadow: new Shader({
                fShaderSource: fShaderShadow, vShaderSource: vShaderShadow,
            }),
            skybox: new Shader({
                fShaderSource: fShaderSkybox, vShaderSource: vShaderSkybox,
            })
        }

        // framebuffers
        this.framebuffers = {
            picker: new Framebuffer({
                width: GL.width, height: GL.height
            }),
            shadow: new Framebuffer({
                width: 1024, height: 1024
            })
        }

        // initialize
        {
            gl.viewport(0, 0, GL.width, GL.height);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        }

    }

    destroy(): void {

        Object.keys(this.shaders).forEach(key => {
            this.shaders[key].destructor();
        });

        Object.keys(this.framebuffers).forEach(key => {
            this.framebuffers[key].destructor();
        });

        const { buffers, textures, cubeTextures } = GL;

        buffers.forEach(buffer => buffer.destructor());

        textures.forEach(texture => texture.destructor());

        cubeTextures.forEach(cubeTexture => cubeTexture.destructor());
    }

    clearColorBuffer(color: IColorRGB): void {
        const { gl } = GL;
        gl.clearColor(color.r / 255, color.g / 255, color.b / 255, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    clearDepthBuffer(): void {
        const { gl } = GL;
        gl.clear(gl.DEPTH_BUFFER_BIT);
    }

    useBuiltinProgram(key: string, defines: string[] = []): void {
        this.currentProgram = this.shaders[key].program(defines);
        GL.gl.useProgram(this.currentProgram.glProgram);
    }

    useProgram(program: Program): void {
        this.currentProgram = program;
        GL.gl.useProgram(this.currentProgram.glProgram);
    }

    uniform(name: string, value: Float32Array | IWebGLTexture): void {
        this.currentProgram.uniform(name, value);
    }

    attribute(name: string, buffer: IWebGLBuffer, stride: number, offset: number): void {
        this.currentProgram.attribute(name, buffer, stride, offset);
    }

    enableDepthTest(): void {
        const { gl } = GL;
        gl.depthMask(true);
    }

    disableDepthTest(): void {
        const { gl } = GL;
        gl.depthMask(false);
    }

    enableBlend(): void {
        const { gl } = GL;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    disableBlend(): void {
        const { gl } = GL;
        gl.disable(gl.BLEND);
    }

    cullFace(culled: string): void {
        const { gl } = GL;
        if (!culled) {
            gl.disable(gl.CULL_FACE);
        } else {
            gl.enable(gl.CULL_FACE);
            if (gl[culled]) {
                gl.cullFace(gl[culled]);
            }
        }
    }

    bindFramebuffer(key: string): void {
        const { gl } = GL;
        const framebuffer = this.framebuffers[key];
        if (framebuffer) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer.framebuffer);
            gl.viewport(0, 0, framebuffer.width, framebuffer.height);
        } else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, GL.width, GL.height);
        }
    }

    getFramebuffer(key: string): Framebuffer {
        const framebuffer = this.framebuffers[key];
        return framebuffer;
    }

    lineWidth(value: number): void {
        const { gl } = GL;
        gl.lineWidth(value);
    }

    elements(buffer: IWebGLBuffer): void {
        const { gl } = GL;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    }

    draw(mode: IWebGLEnum, count: number, type: IWebGLEnum, offset: number): void {
        const { gl } = GL;
        gl.drawElements(mode, count, type, offset);
    }

    readFramebufferPixel(key: string, x: number, y: number): Uint8Array {
        const { gl } = GL;

        if (this.framebuffers[key]) {
            this.bindFramebuffer(key);
            var pixels = new Uint8Array(1 * 1 * 4);
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            this.bindFramebuffer(null);
            return pixels;
        } else {
            this.bindFramebuffer(key);
            var pixels = new Uint8Array(1 * 1 * 4);
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            return pixels;
        }
    }
}

export default Engine;