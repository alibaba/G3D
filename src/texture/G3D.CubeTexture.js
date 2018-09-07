class CubeTexture {

    glTexture = null;

    mipLevel = 0;

    constructor({ images, width, height, flipY = false, sRGB = true }) {

        const { gl } = GL;

        const texture = this.glTexture = gl.createTexture();

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

        // filter
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // wrap
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

        const { extensions } = GL;

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);

        const format = sRGB && extensions.SRGB ? extensions.SRGB.SRGB_ALPHA_EXT : gl.RGBA;


        Object.keys(targets).forEach(k => {

            const image = images[k];

            if (image instanceof Uint8Array) {

                gl.texImage2D(targets[k], 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, images[k]);

            } else if (image instanceof Float32Array) {

                gl.texImage2D(targets[k], 0, gl.RGBA, width, height, 0, gl.RGBA, gl.FLOAT, images[k]);

            } else if (image instanceof Env.Image) {

                gl.texImage2D(targets[k], 0, format, format, gl.UNSIGNED_BYTE, images[k]);

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

            this.mipLevel = images.mip.length;

        }
    }

    destructor() {

        const { gl } = GL;

        gl.deleteTexture(this.glTexture);

    }
}

export default CubeTexture;