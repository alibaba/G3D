import fShaderMaterialPhong from '../shaders/material-phong.frag.glsl';
import vShaderMaterialPhong from '../shaders/material-phong.vert.glsl';

import fShaderMaterialRaw from '../shaders/material-raw.frag.glsl';
import vShaderMaterialRaw from '../shaders/material-raw.vert.glsl';

import fShaderMaterialPBR from '../shaders/material-pbr.frag.glsl';
import vShaderMaterialPBR from '../shaders/material-pbr.vert.glsl';

import fShaderMaterialGem from '../shaders/material-gem.frag.glsl';
import vShaderMaterialGem from '../shaders/material-gem.vert.glsl';

import fShaderPicker from '../shaders/picker.frag.glsl';
import vShaderPicker from '../shaders/picker.vert.glsl';

import fShaderShadow from '../shaders/shadow.frag.glsl';
import vShaderShadow from '../shaders/shadow.vert.glsl';

import fShaderSkybox from '../shaders/skybox.frag.glsl';
import vShaderSkybox from '../shaders/skybox.vert.glsl';

class Engine {

    width = 0;
    height = 0;
    currentProgram = {};
    programs = {};
    framebuffers = {};
    extensions = {};
    precisions = {};

    static instance = null;

    constructor(canvas) {

        if (Engine.instance) {
            throw new Error('Only 1 Engine instance is allowed.');
        }

        // TODO : remove
        Engine.instance = this;

        const gl = GL.gl = canvas.getContext('webgl', {
            antialias: true,
            preserveDrawingBuffer: true
        });

        // TODO : remove
        this.gl = gl;

        this.width = canvas.width;
        this.height = canvas.height;

        const extensions = GL.extensions = this.extensions;

        extensions.TEX_LOD = gl.getExtension('EXT_shader_texture_lod');

        // TODO : check support
        gl.getExtension('OES_standard_derivatives');
        gl.getExtension('OES_element_index_uint');

        gl.getExtension('OES_texture_float');
        gl.getExtension('OES_texture_float_linear');

        extensions.SRGB = gl.getExtension('EXT_SRGB');

        const precisions = this.precisions;

        {
            const high = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision !== 0;
            const medium = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision !== 0;
            precisions.float = high ? 'mediump' : medium ? 'mediump' : 'lowp';
        }

        this.programs = {
            phong: new Program({
                gl, fShaderSource: fShaderMaterialPhong, vShaderSource: vShaderMaterialPhong, extensions, precisions
            }),
            raw: new Program({
                gl, fShaderSource: fShaderMaterialRaw, vShaderSource: vShaderMaterialRaw, extensions, precisions
            }),
            pbr: Env.pbrNotReady ? null :
                new Program({
                    gl, fShaderSource: fShaderMaterialPBR, vShaderSource: vShaderMaterialPBR, extensions, precisions
                }),
            gem: new Program({
                gl, fShaderSource: fShaderMaterialGem, vShaderSource: vShaderMaterialGem, extensions, precisions
            }),
            picker: Env.framebufferNotReady ? null :
                new Program({
                    gl, fShaderSource: fShaderPicker, vShaderSource: vShaderPicker, extensions, precisions
                }),
            shadow: Env.framebufferNotReady ? null :
                new Program({
                    gl, fShaderSource: fShaderShadow, vShaderSource: vShaderShadow, extensions, precisions
                }),
            skybox: Env.framebufferNotReady ? null :
                new Program({
                    gl, fShaderSource: fShaderSkybox, vShaderSource: vShaderSkybox, extensions, precisions
                })
        }

        this.framebuffers = {
            picker: Env.framebufferNotReady ? null :
                new Framebuffer({ gl, width: this.width, height: this.height }),
            shadow: Env.framebufferNotReady ? null :
                new Framebuffer({ gl, width: 1024, height: 1024 })
        }

        gl.viewport(0, 0, this.width, this.height);

        gl.enable(gl.DEPTH_TEST);

        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    }

    destroy() {

        Object.keys(this.programs).forEach(key => {
            this.programs[key].destructor();
        });

        Object.keys(this.framebuffers).forEach(key => {
            this.framebuffers[key].destructor();
        });

        const { buffers, textures, cubeTextures } = GL;

        buffers.forEach(buffer => buffer.destructor());

        textures.forEach(texture => texture.destructor());

        cubeTextures.forEach(cubeTexture => cubeTexture.destructor());
    }

    clearColorBuffer(color) {
        const gl = this.gl;
        gl.clearColor(color.r / 255, color.g / 255, color.b / 255, color.a !== undefined ? color.a / 255 : 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    clearDepthBuffer() {
        const gl = this.gl;
        gl.clear(gl.DEPTH_BUFFER_BIT);
    }

    useProgram(key, defines = []) {

        this.currentProgram = { key, defines };

        const program = this.programs[key].define(defines);

        this.gl.useProgram(program.program);
    }

    uniform(name, value) {

        const { key, defines } = this.currentProgram;

        const program = this.programs[key].define(defines);
        program.uniform(name, value);
    }

    attribute(name, buffer, stride, offset) {

        const { key, defines } = this.currentProgram;
        const program = this.programs[key].define(defines);
        program.attribute(name, buffer, stride, offset);
    }

    enableDepthTest() {
        const gl = this.gl;
        gl.depthMask(true);
    }

    disableDepthTest() {
        const gl = this.gl;
        gl.depthMask(false);
    }

    enableBlend() {
        const gl = this.gl;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    disableBlend() {
        const gl = this.gl;
        gl.disable(gl.BLEND);
    }

    cullFace(isBack = true) {
        const { gl } = GL;
        if (isBack) {
            gl.cullFace(gl.BACK);
        } else {
            gl.cullFace(gl.FRONT);
        }
    }

    bindFramebuffer(key) {
        const gl = this.gl;
        const framebuffer = this.framebuffers[key];
        if (framebuffer) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer.framebuffer);
            gl.viewport(0, 0, framebuffer.width, framebuffer.height);
        } else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, this.width, this.height);
        }
    }

    getFramebuffer(key) {
        const framebuffer = this.framebuffers[key];
        return framebuffer;
    }

    lineWidth(value) {
        const gl = this.gl;
        gl.lineWidth(value);
    }

    elements(buffer) {
        const gl = this.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    }

    draw(mode, count, type, offset) {
        const gl = this.gl;
        if (typeof mode === 'string') {
            mode = gl[mode];
        }

        if (typeof type === 'string') {
            type = gl[type];
        }

        gl.drawElements(mode, count, type, offset);
    }

    readFramebufferPixel(key, x, y) {
        const gl = this.gl;

        if (this.framebuffers[key]) {
            this.bindFramebuffer(key);
            var pixels = new Uint8Array(1 * 1 * 4);
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            this.bindFramebuffer(null);
            return [...pixels];
        } else {
            this.bindFramebuffer(key);
            var pixels = new Uint8Array(1 * 1 * 4);
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            return [...pixels];
        }
    }
}

export default Engine;