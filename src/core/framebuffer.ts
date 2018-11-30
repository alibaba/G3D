import { IWebGlFramebuffer, IWebGLRenderBuffer, IWebGLTexture } from "../types/webgl";
import GL from "./gl";

interface IFramebufferConfig {
    width: number;
    height: number;
}

class Framebuffer {

    public width: number;
    public height: number;

    public framebuffer: IWebGlFramebuffer;
    public colorTarget: IWebGLTexture;
    public depthTarget: IWebGLRenderBuffer;

    constructor({ width, height }: IFramebufferConfig) {

        const { gl } = GL;

        this.width = width;
        this.height = height;

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

        this.framebuffer = framebuffer;
        this.colorTarget = colorTarget;
        this.depthTarget = depthTarget;
    }

    public destructor(): void {

        const { gl } = GL;
        const { framebuffer, colorTarget, depthTarget } = this;

        gl.deleteRenderbuffer(depthTarget);
        gl.deleteTexture(colorTarget);
        gl.deleteFramebuffer(framebuffer);

    }
}

export default Framebuffer;
