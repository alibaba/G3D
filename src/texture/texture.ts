import GL from "../core/gl";

import { isPowerOf2 } from "../utils/math";

interface ITextureConfig {
    image: HTMLImageElement;
    width?: number;
    height?: number;
    sRGB?: boolean;
    flipY?: boolean;
    repeat?: boolean;
    mipmap?: boolean;
}

class Texture {

    public glTexture: WebGLTexture;

    constructor({
        image,
        width = image.width,
        height = image.height,
        sRGB = false,
        flipY = true,
        repeat = true, /*or clamp*/
        mipmap = true,
    }: ITextureConfig) {

        const { gl, textures, extensions } = GL;

        const texture = this.glTexture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const isP2 = (width === height) && isPowerOf2(width) && isPowerOf2(height);

        const extensionSRGB = extensions.get("SRGB");

        repeat = repeat && isP2;
        sRGB = sRGB && extensionSRGB && isP2;
        mipmap = mipmap && isP2 && !sRGB;

        // wrap
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE);

        // filter
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipmap ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR);

        // store
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY ? 1 : 0);

        // fill data
        const format = sRGB ? extensionSRGB.SRGB_ALPHA_EXT : gl.RGBA;

        if (image instanceof Uint8Array) {
            gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.UNSIGNED_BYTE, image);
        } else {
            gl.texImage2D(gl.TEXTURE_2D, 0, format, format, gl.UNSIGNED_BYTE, image);
        }

        if (mipmap) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }

        textures.add(this);
    }

    public destructor() {

        const { gl } = GL;

        gl.deleteTexture(this.glTexture);
    }
}

export default Texture;
