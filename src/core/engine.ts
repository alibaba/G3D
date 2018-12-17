import Scene from "../scene/scene";
import Framebuffer from "./framebuffer";
import GL from "./gl";
import Shader from "./shader";

import * as fShaderPicker from "../shaders/picker.frag.glsl";
import * as vShaderPicker from "../shaders/picker.vert.glsl";

import * as fShaderShadow from "../shaders/shadow.frag.glsl";
import * as vShaderShadow from "../shaders/shadow.vert.glsl";

import * as fShaderSkybox from "../shaders/skybox.frag.glsl";
import * as vShaderSkybox from "../shaders/skybox.vert.glsl";

import { IColorRGB } from "../types/raw";
import Program from "./program";

class Engine {

    // TODO: remove it
    public static instance: Engine = null;

    public currentProgram: Program;
    public currentScene: Scene;

    private shaders: Map<string, Shader> = new Map();
    private framebuffers: { [prop: string]: Framebuffer } = {};

    private pixelDataReaded: Uint8Array = new Uint8Array(4);

    constructor(canvas: HTMLCanvasElement) {

        if (Engine.instance) {
            throw new Error("Only 1 Engine instance is allowed.");
        }
        Engine.instance = this;

        GL.gl = canvas.getContext("webgl", {
            antialias: true,
            preserveDrawingBuffer: true,
        });

        const { gl } = GL;

        GL.width = canvas.width;
        GL.height = canvas.height;

        // extensions
        {
            const { extensions } = GL;

            extensions.set("TEX_LOD", gl.getExtension("EXT_shader_texture_lod"));

            extensions.set("DER", gl.getExtension("OES_standard_derivatives"));

            extensions.set("ELE_UNIT", gl.getExtension("OES_element_index_uint"));

            extensions.set("SRGB", gl.getExtension("EXT_SRGB"));
        }

        // precisions
        {
            const { precisions } = GL;

            const high = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision !== 0;
            const medium = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision !== 0;

            precisions.set("float", high ? "mediump" : medium ? "mediump" : "lowp");
        }

        // shaders
        this.shaders.set("picker", new Shader({
            fShaderSource: fShaderPicker, vShaderSource: vShaderPicker,
        }));
        this.shaders.set("shadow", new Shader({
            fShaderSource: fShaderShadow, vShaderSource: vShaderShadow,
        }));
        this.shaders.set("skybox", new Shader({
            fShaderSource: fShaderSkybox, vShaderSource: vShaderSkybox,
        }));

        // framebuffers
        this.framebuffers = {
            picker: new Framebuffer({
                width: GL.width,
                height: GL.height,
            }),
            shadow: new Framebuffer({
                width: 1024, height: 1024,
            }),
        };

        // initialize
        {
            gl.viewport(0, 0, GL.width, GL.height);
            gl.enable(gl.DEPTH_TEST);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        }

    }

    public destroy(): void {

        const { buffers, textures } = GL;

        for (const bf of buffers) {
            bf.destructor();
        }
        buffers.clear();

        for (const tx of textures) {
            tx.destructor();
        }
        textures.clear();
    }

    public clearColorBuffer(color: IColorRGB): void {
        const { gl } = GL;
        gl.clearColor(color.r / 255, color.g / 255, color.b / 255, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    public clearDepthBuffer(): void {
        const { gl } = GL;
        gl.clear(gl.DEPTH_BUFFER_BIT);
    }

    public useBuiltinProgram(key: string, defines: string[] = []): void {
        this.currentProgram = this.shaders.get(key).program(defines);
        GL.gl.useProgram(this.currentProgram.glProgram);
    }

    public useProgram(program: Program): void {
        this.currentProgram = program;
        GL.gl.useProgram(this.currentProgram.glProgram);
    }

    public uniform(name: string, value: Float32Array | WebGLTexture): void {
        this.currentProgram.uniform(name, value);
    }

    public attribute(name: string, buffer: WebGLBuffer, stride: number, offset: number): void {
        this.currentProgram.attribute(name, buffer, stride, offset);
    }

    public enableDepthMask(): void {
        const { gl } = GL;
        gl.depthMask(true);
    }

    public disableDepthMask(): void {
        const { gl } = GL;
        gl.depthMask(false);
    }

    public enableBlend(): void {
        const { gl } = GL;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    public disableBlend(): void {
        const { gl } = GL;
        gl.disable(gl.BLEND);
    }

    public cullFace(culled: string): void {
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

    public bindFramebuffer(key: string): void {
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

    public getFramebuffer(key: string): Framebuffer {
        const framebuffer = this.framebuffers[key];
        return framebuffer;
    }

    public lineWidth(value: number): void {
        const { gl } = GL;
        gl.lineWidth(value);
    }

    public elements(buffer: WebGLBuffer): void {
        const { gl } = GL;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    }

    public draw(mode: number, count: number, type: number, offset: number): void {
        const { gl } = GL;
        gl.drawElements(mode, count, type, offset);
    }

    public readFramebufferPixel(key: string, x: number, y: number): number[] {

        const { pixelDataReaded: pixels } = this;
        const { gl } = GL;

        if (this.framebuffers[key]) {

            y = GL.height - y;

            this.bindFramebuffer(key);

            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

            this.bindFramebuffer(null);

            return [
                pixels[0], pixels[1], pixels[2], pixels[3],
            ];

        }
    }
}

export default Engine;
