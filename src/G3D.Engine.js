import fShaderDefault from './shaders/default.frag.glsl';
import vShaderDefault from './shaders/default.vert.glsl';

import fShaderPicker from './shaders/picker.frag.glsl';
import vShaderPicker from './shaders/picker.vert.glsl';

class Engine {

    width = 0;
    height = 0;
    _currentProgram = null;
    _programs = {};
    _framebuffers = {};

    constructor(canvas) {
        const gl = this._gl = canvas.getContext('webgl', { antialias: true });
        this.width = canvas.width;
        this.height = canvas.height;

        this._programs = {
            default: new Program({
                gl, fShaderSource: fShaderDefault, vShaderSource: vShaderDefault
            }),
            picker: new Program({
                gl, fShaderSource: fShaderPicker, vShaderSource: vShaderPicker
            })
        }

        this._framebuffers = {
            picker: Env.framebufferNotReady ? null :
                this.createFramebuffer({ width: this.width, height: this.height }).framebuffer
        }

        gl.viewport(0, 0, this.width, this.height);
        gl.enable(gl.DEPTH_TEST);
        gl.getExtension('OES_element_index_uint');
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    }

    clearColorBuffer(color) {
        const gl = this._gl;
        gl.clearColor(color.r / 255, color.g / 255, color.b / 255, color.a !== undefined ? color.a / 255 : 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    clearDepthBuffer() {
        const gl = this._gl;
        gl.clear(gl.DEPTH_BUFFER_BIT);
    }

    useProgram(key) {
        this._currentProgram = this._programs[key];
        this._gl.useProgram(this._currentProgram._program);
    }

    uniform(name, value) {
        this._currentProgram.uniform(name, value);
    }

    attribute(name, buffer) {
        this._currentProgram.attribute(name, buffer);
    }

    enableDepthMask() {
        const gl = this._gl;
        gl.depthMask(true);
    }

    disableDepthMask() {
        const gl = this._gl;
        gl.depthMask(false);
    }

    enableBlend() {
        const gl = this._gl;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    disableBlend() {
        const gl = this._gl;
        gl.disable(gl.BLEND);
    }

    createAttributeBuffer(value) {
        const gl = this._gl;
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, value, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return buffer;
    }

    createElementBuffer(value) {
        const gl = this._gl;
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, value, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        return buffer;
    }

    createTexture(image) {
        const gl = this._gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        if (image instanceof Uint8Array) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
        } else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            const isPowerOf2 = n => Math.log(n) / Math.log(2) % 1 === 0;
            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
            }
        }
        return texture;
    }

    createFramebuffer({ width, height, useColorBuffer = false }) {

        const gl = this._gl;

        const framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        let colorTarget, depthTarget;

        if (useColorBuffer) {
            const renderbuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, width, height);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, renderbuffer);
            colorTarget = renderbuffer;
        } else {
            const tex = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
            colorTarget = tex;
        }

        const renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
        depthTarget = renderbuffer;

        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            throw new Error(`framebuffer not ready ${gl.checkFramebufferStatus(gl.FRAMEBUFFER)}`);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return {
            framebuffer,
            colorTarget, depthTarget
        };
    }

    bindFramebuffer(key) {
        const gl = this._gl;
        const framebuffer = this._framebuffers[key];
        if (framebuffer) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        } else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
    }

    lineWidth(value) {
        const gl = this._gl;
        gl.lineWidth(value);
    }

    elements(buffer) {
        const gl = this._gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    }

    draw(count, { lines } = {}) {
        const gl = this._gl;
        const type = lines ? gl.LINES : gl.TRIANGLES;
        gl.drawElements(type, count, gl.UNSIGNED_INT, 0);
    }

    readFramebufferPixel(key, x, y) {
        const gl = this._gl;

        if (this._framebuffers[key]) {
            this.bindFramebuffer(key);
            var pixels = new Uint8Array(1 * 1 * 4);
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            this.bindFramebuffer(null);
            return [...pixels];
        } else {
            throw new Error(`framebuffer ${key} not exits`);
        }
    }
}

export default Engine;