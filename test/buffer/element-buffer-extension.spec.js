import expect from '../helpers/expect';
import { initWebGL } from '../helpers/init';

import ElementBuffer from '../../src/buffer/element-buffer';
import GL from '../../src/core/gl';

describe('element buffer with extension OES_element_index_uint', function () {

    before(function () {

        const gl = initWebGL();
        GL.gl = gl;
        GL.extensions.set('ELE_UNIT', gl.getExtension('OES_element_index_uint'));

    })

    afterEach(function () {

        for (let buffer of GL.buffers) {
            buffer.destructor();
        }
    })

    it('create with Uint16Array', function () {

        const data = new Uint16Array([1, 2, 3]);

        const ebuffer = new ElementBuffer({
            data
        });


        expect(ebuffer.u32).toBe(false);
        expect(ebuffer.glBuffer).toBeInstanceOf(WebGLBuffer);
        expect(ebuffer.arrayBuffer).toBeInstanceOf(ArrayBuffer);
        expect(GL.buffers.size).toEqual(1);

    });

    it('create with arraybuffer', function () {

        const data = (new Uint16Array([1, 2, 3])).buffer;

        const ebuffer = new ElementBuffer({
            data
        });

        expect(ebuffer.u32).toBe(false);
        expect(ebuffer.glBuffer).toBeInstanceOf(WebGLBuffer);
        expect(ebuffer.arrayBuffer).toBeInstanceOf(ArrayBuffer);
        expect(GL.buffers.size).toEqual(1);

    });

    it('create with Uint32Array should throw error', function () {

        const data = new Uint32Array([1, 2, 3]);

        const ebuffer = new ElementBuffer({
            data
        });

        expect(ebuffer.u32).toBe(true);
        expect(ebuffer.glBuffer).toBeInstanceOf(WebGLBuffer);
        expect(ebuffer.arrayBuffer).toBeInstanceOf(ArrayBuffer);
        expect(GL.buffers.size).toEqual(1);
    });

});

