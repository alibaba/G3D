import expect from 'expect';

expect.extend({

    toEqualFloat(received, value, eps) {
        if (typeof eps === 'undefined') {
            eps = 0.000001;
        }

        const pass = received >= value - eps && received <= value + eps;

        if (pass) {
            return {
                message: () =>
                    `expected ${received} to be equal with ${value}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be equal with ${value}`,
                pass: false,
            };
        }
    },

    toEqualArray(received, value, eps) {
        if (typeof eps === 'undefined') {
            eps = 0.000001;
        }

        if (typeof received.length !== 'number' || received.length !== value.length) {
            return {
                message: () => `length dose not match`,
                pass: false
            }
        } else {
            for (let i = 0; i < value.length; i++) {
                if (Math.abs(received[i] - value[i]) > eps) {
                    return {
                        message: () =>
                            `received value ${received} not equal with expected value ${value}`,
                        pass: false
                    }
                }
            }
            return {
                message: () => `pass`,
                pass: true
            }
        }

    },

    toRenderAs(received, value) {

        const canvas = received;
        const image = value;

        if (canvas.width !== image.width || canvas.height !== image.height) {

            return {
                message: () => `canvas size [${canvas.width}, ${canvas.height}] not equal to ` +
                    `image size [${image.width}, ${image.height}]`,
                pass: false
            }

        } else {

            const { width, height } = canvas;

            // read image pixels

            const imageCanvas = document.createElement('canvas');
            imageCanvas.width = width;
            imageCanvas.height = height;
            imageCanvas.style.width = width + 'px';
            imageCanvas.style.height = height + 'px';
            document.body.appendChild(imageCanvas);

            const ctx = imageCanvas.getContext('2d')
            ctx.drawImage(image, 0, 0, width, height);

            const imagePixels = ctx.getImageData(0, 0, width, height).data;

            // read canvas pixels

            const gl = canvas.getContext('webgl');
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, width, height);

            const glPixels = new Uint8Array(width * height * 4);
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, glPixels);

            // compare

            let res = {
                message: () => `pass`,
                pass: true
            };

            const diffMap = {};
            let diffCount = 0;
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {

                    const p = ((height - i - 1) * width + j) * 4;
                    const q = (i * height + j) * 4;

                    const [r1, g1, b1, a1] = [glPixels[p], glPixels[p + 1], glPixels[p + 2], glPixels[p + 3]];
                    const [r2, g2, b2, a2] = [imagePixels[q], imagePixels[q + 1], imagePixels[q + 2], imagePixels[q + 3]];

                    const [dr, dg, db, da] = [r1 - r2, g1 - g2, b1 - b2, a1 - a2].map(v => Math.abs(v));

                    const eps = 10;
                    if (dr > eps || dg > eps || db > eps || da > eps) {
                        // console.log(`DIF: [${r1},${g1},${b1},${a1}] - [${r2},${g2},${b2},${a2}] - @[${i},${j}]`);
                        diffMap[`${i}-${j}`] = true;
                        diffCount++;
                    }
                }
            }

            const countEps = width * height * 0.02;
            // const countEps = 0;
            if (diffCount > countEps) {
                console.log('===== DIFFERENCE MAP =====');
                for (let i = 0; i < height; i++) {
                    let value = `${i}`;
                    for (let j = 0; j < width; j++) {
                        if (diffMap[`${i}-${j}`]) {
                            value += '*';
                        } else {
                            value += ' ';
                        }
                    }
                    console.log(value);
                }
                res = {
                    message: () => `color is not equal for ${diffCount}/${width * height} pixels.`,
                    pass: false
                }
            }

            return res;
        }
    }

});

export default expect;