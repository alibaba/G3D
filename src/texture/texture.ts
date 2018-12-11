import GL from "../core/gl";

import { isPowerOf2 } from "../utils/math";

interface ITextureConfig {
    image: HTMLImageElement;
    sRGB?: boolean;
    flipY?: boolean;
    repeat?: boolean;
    mipmap?: boolean;
    mip?: HTMLImageElement[];
}

class Texture {

    public glTexture: WebGLTexture;

    public mipLevel: number = 0;

    private mipmap: boolean;

    private sRGB: boolean;

    private width: number;

    constructor({
        image,
        sRGB = false,
        flipY = true,
        repeat = true, /*or clamp*/
        mipmap = true,
        mip = null,
    }: ITextureConfig) {

        const { gl, textures, extensions } = GL;

        const texture = this.glTexture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const { width, height } = image;
        const isP2 = (width === height) && isPowerOf2(width) && isPowerOf2(height);

        const extensionSRGB = extensions.get("SRGB");

        repeat = repeat && isP2;
        sRGB = sRGB && extensionSRGB && isP2;
        mipmap = mipmap && isP2 && !sRGB;

        this.mipmap = mipmap;
        this.sRGB = sRGB;
        this.width = width;

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

        gl.texImage2D(gl.TEXTURE_2D, 0, format, format, gl.UNSIGNED_BYTE, image);

        if (mipmap) {
            gl.generateMipmap(gl.TEXTURE_2D);

            this.mipLevel = Math.log2(this.width);
        }

        if (mipmap && mip) {
            this.setMipmaps(mip);
        }

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);

        textures.add(this);
    }

    public setMipmaps(mip: HTMLImageElement[]): void {

        if (this.mipmap) {

            const { gl, extensions } = GL;

            const format = this.sRGB ? extensions.get("SRGB").SRGB_ALPHA_EXT : gl.RGBA;

            if (mip.length === Math.log2(this.width)) {
                for (let i = 0; i < mip.length; i++) {
                    const image = mip[i];
                    const size = Math.pow(2, mip.length - i - 1);
                    if (image.width === size && image.height === size) {
                        gl.texImage2D(gl.TEXTURE_2D, i + 1, format, format, gl.UNSIGNED_BYTE, image);
                    } else {
                        throw new Error("Mipmap image size invalid.");
                    }
                }
            } else {
                throw new Error("Mipmap length invalid.");
            }
        }
    }

    public destructor() {

        const { gl, textures } = GL;

        gl.deleteTexture(this.glTexture);

        textures.delete(this);
    }
}

export default Texture;
