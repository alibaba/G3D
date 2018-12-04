import GL from "../core/gl";

const isPowerOf2 = (n) => Math.log(n) / Math.log(2) % 1 === 0;

interface ITextureConfig {
    image: HTMLImageElement;
    width?: number;
    height?: number;
    sRGB?: boolean;
    flipY?: boolean;
    repeat?: boolean;
}

class Texture {

    public glTexture: WebGLTexture;

    constructor({
        image, width = image.width, height = image.height, sRGB = false,
        flipY = true, repeat = true, /*or clamp*/
    }: ITextureConfig) {

        const { gl, textures } = GL;

        const texture = this.glTexture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // wrap
        // REPEAT works only when image size is power of 2
        if (repeat) {
            if (!isPowerOf2(width)) {
                throw new Error("image width should be power of 2, or you need to set repeat option to false.");
            }
            if (!isPowerOf2(height)) {
                throw new Error("image height should be power of 2, or you need to set repeat option to false.");
            }
        }

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE);

        // filter
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        // store
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY ? 1 : 0);

        // fill data
        if (image instanceof Uint8Array) {

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);

        } else if (image instanceof Float32Array) {

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.FLOAT, image);

        } else {

            const { extensions } = GL;

            const format = sRGB && extensions.SRGB ? extensions.SRGB.SRGB_ALPHA_EXT : gl.RGBA;

            gl.texImage2D(gl.TEXTURE_2D, 0, format, format, gl.UNSIGNED_BYTE, image);

            if (isPowerOf2(width) && isPowerOf2(height)) {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                // gl.generateMipmap(gl.TEXTURE_2D);
            }
        }

        textures.push(this);
    }

    public destructor() {

        const { gl } = GL;

        gl.deleteTexture(this.glTexture);

    }
}

export default Texture;
