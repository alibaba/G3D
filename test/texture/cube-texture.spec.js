import CubeTexture from '../../src/texture/cube-texture';
import GL from '../../src/core/gl';

import pbrAssets from '../helpers/pbr-assets';
import expect from '../helpers/expect';
import { initWebGL } from '../helpers/init';

describe('cube texture', function () {

    let images;

    before(function (done) {

        GL.gl = initWebGL();

        pbrAssets('default', function (sp) {
            images = sp;
            done();
        });

    });

    afterEach(function () {
        for (const texture of GL.textures) {
            texture.destructor();
        }
    });

    it('create textures', function () {
        const cubeTexture = new CubeTexture({
            images
        })

        expect(cubeTexture.glTexture).toBeInstanceOf(WebGLTexture);
        expect(GL.textures.size).toBe(1);
    })

    it('create textures and set mipmaps', function () {

        const imgs = { ...images };
        delete imgs.mip;

        const cubeTexture = new CubeTexture({
            images: imgs
        });

        expect(
            () => {
                const mip = [...images.mip];
                mip.pop();
                cubeTexture.setMipmaps(mip);
            }
        ).toThrowError();

        expect(
            () => {
                const mip = [...images.mip];
                mip[1] = {...mip[1]};
                mip[2] = {...mip[2]};
                mip[1].left = mip[2].left;
                cubeTexture.setMipmaps(mip);
            }
        ).toThrowError();

        const mip = [...images.mip];
        cubeTexture.setMipmaps(mip);

        expect(cubeTexture.glTexture).toBeInstanceOf(WebGLTexture);
        expect(GL.textures.size).toBe(1);
    })
});
