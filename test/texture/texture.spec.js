import Texture from '../../src/texture/texture';
import GL from '../../src/core/gl';

import loader from '../helpers/loader';
import expect from '../helpers/expect';
import { initWebGL } from '../helpers/init';


const imageUrl1000 = '//gw.alicdn.com/tfs/TB1YO_WtQvoK1RjSZFNXXcxMVXa-1000-1000.png';
const imageUrl1024 = '//gw.alicdn.com/tfs/TB1_x5StSzqK1RjSZFpXXakSXXa-1024-1024.png';


describe('texture', function () {

    let image1000;
    let image1024;

    before(function (done) {

        const gl = initWebGL();
        GL.gl = gl;

        loader.loadImageQueue(
            [imageUrl1000, imageUrl1024],
            function ([i1, i2]) {
                [image1000, image1024] = [i1, i2];
                done();
            }
        )
    });

    afterEach(function () {
        for (const texture of GL.textures) {
            texture.destructor();
        }
    })

    it('create texture with default options', function () {
        const texture = new Texture({ image: image1024 });

        expect(texture.glTexture).toBeInstanceOf(WebGLTexture);
        expect(GL.textures.size).toBe(1);
    });

    it('create texture with n-p-2 image', function () {
        const texture = new Texture({ image: image1000 });

        expect(texture.glTexture).toBeInstanceOf(WebGLTexture);
        expect(GL.textures.size).toBe(1);
    });

})