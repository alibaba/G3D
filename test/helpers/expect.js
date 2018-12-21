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

            let s = 0;
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {

                    const p = i * width + j;
                    const q = p;

                    const [r1, g1, b1, a1] = [glPixels[p], glPixels[p + 1], glPixels[p + 2], glPixels[p + 3]];
                    const [r2, g2, b2, a2] = [imagePixels[q], imagePixels[q + 1], imagePixels[q + 2], imagePixels[q + 3]];

                    if (r1 !== r2 || g1 !== g2 || b1 !== b2 || a1 !== a2) {
                        console.log(`DIF: [${r1},${g1},${b1},${a1}] - [${r2},${g2},${b2},${a2}] - @[${i},${j}]`)
                        s++;
                        res = {
                            message: () => `pixel value not eqaul for index ${i}`,
                            pass: false
                        }
                        // return res;
                    }
                }
            }

            // console.log('DIF PIXEL COUNT ---', s);
            return res;
        }
    }

});

export default expect;