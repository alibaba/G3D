import fShaderMaterialPhong from '../shaders/material-phong.frag.glsl';
import vShaderMaterialPhong from '../shaders/material-phong.vert.glsl';

import fShaderMaterialRaw from '../shaders/material-raw.frag.glsl';
import vShaderMaterialRaw from '../shaders/material-raw.vert.glsl';

import fShaderMaterialPBR from '../shaders/material-pbr.frag.glsl';
import vShaderMaterialPBR from '../shaders/material-pbr.vert.glsl';

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

        // gl.enable(gl.CULL_FACE);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    }

    destroy() {

        Object.keys(this.programs).forEach(key => {
            this.programs[key].destroy();
        });

        Object.keys(this.framebuffers).forEach(key => {
            this.framebuffers[key].destroy();
        });

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

    enableDepthMask() {
        const gl = this.gl;
        gl.depthMask(true);
    }

    disableDepthMask() {
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

    createBuffer(value, target) {
        const gl = this.gl;
        const buffer = gl.createBuffer();
        gl.bindBuffer(target, buffer);
        gl.bufferData(target, value, gl.STATIC_DRAW);
        gl.bindBuffer(target, null);
        return buffer;
    }

    createAttributeBuffer(value) {
        const gl = this.gl;
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, value, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return buffer;
    }

    createElementBuffer(value) {
        const gl = this.gl;
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, value, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        return buffer;
    }

    // createTexture(image, width, height, sRGB, flipY, clamp) {

    //     const isPowerOf2 = n => Math.log(n) / Math.log(2) % 1 === 0;

    //     const gl = this.gl;

    //     const texture = gl.createTexture();

    //     gl.activeTexture(gl.TEXTURE0);

    //     gl.bindTexture(gl.TEXTURE_2D, texture);

    //     clamp = clamp || (!isPowerOf2(width) || !isPowerOf2(height));

    //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, clamp ? gl.CLAMP_TO_EDGE : gl.REPEAT);
    //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, clamp ? gl.CLAMP_TO_EDGE : gl.REPEAT);
    //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    //     gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);

    //     if (image instanceof Uint8Array) {

    //         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);

    //     } else if (image instanceof Float32Array) {

    //         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.FLOAT, image);

    //     } else {

    //         let format = gl.RGBA;
    //         if (sRGB && this.extensions.SRGB) {
    //             format = this.extensions.SRGB.SRGB_ALPHA_EXT;
    //         }

    //         gl.texImage2D(gl.TEXTURE_2D, 0, format, format, gl.UNSIGNED_BYTE, image);

    //         if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
    //             gl.generateMipmap(gl.TEXTURE_2D);
    //             gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
    //         }
    //     }
    //     return texture;
    // }

    createCubeTexture(images, width, height, sRGB, flipY) {

        const gl = this.gl;

        const texture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0);

        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        const targets = {
            right: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            left: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
            top: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
            bottom: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            front: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
            back: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
        }

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);

        let format = gl.RGBA;
        if (sRGB && this.extensions.SRGB) {
            format = this.extensions.SRGB.SRGB_ALPHA_EXT;
        }

        Object.keys(targets).forEach(k => {

            const image = images[k];

            if (image instanceof Env.Image) {

                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

                gl.texImage2D(targets[k], 0, format, format, gl.UNSIGNED_BYTE, images[k]);

            } else if (image instanceof Uint8Array) {

                gl.texImage2D(targets[k], 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, images[k]);

            }

        })

        if (images.mip) {

            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

            images.mip.forEach((images, i) => {

                Object.keys(images).forEach(k => {

                    const image = images[k];

                    if (image instanceof Env.Image) {

                        gl.texImage2D(targets[k], i + 1, format, format, gl.UNSIGNED_BYTE, images[k]);

                    }
                })

            });

        }

        return texture;
    }

    createFramebuffer({ width, height }) {

        const gl = this.gl;

        const framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

        const colorTarget = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, colorTarget);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTarget, 0);

        const depthTarget = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthTarget);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthTarget);

        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            throw new Error(`framebuffer not ready ${gl.checkFramebufferStatus(gl.FRAMEBUFFER)}`);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return {
            framebuffer,
            colorTarget,
            depthTarget,
            width,
            height,
            destroy: () => {
                gl.deleteRenderbuffer(depthTarget);
                gl.deleteTexture(colorTarget);
                gl.deleteFramebuffer(framebuffer);
            }
        };
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