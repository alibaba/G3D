import expect from '../helpers/expect';
import { initWebGL } from '../helpers/init';

import Buffer from '../../src/buffer/buffer';
import GL from '../../src/core/gl';

describe('buffer', function () {

    before(function () {
        const gl = initWebGL();
        GL.gl = gl;
    });

    afterEach(function () {
        for (const buffer of GL.buffers) {
            buffer.destructor();
        }
    });

    it('create with float32array', function () {

        const buffer = new Buffer({
            data: new Float32Array([1, 2, 3])
        });

        expect(buffer.glBuffer instanceof WebGLBuffer).toBe(true);
        expect(buffer.arrayBuffer instanceof ArrayBuffer).toBe(true);
        expect(GL.buffers.size).toEqual(1);

    });

    it('create with arraybuffer', function () {

        const arrayBuffer = (new Float32Array([1, 2, 3])).buffer;

        const buffer = new Buffer({
            data: arrayBuffer
        });

        expect(buffer.glBuffer instanceof WebGLBuffer).toBe(true);
        expect(buffer.arrayBuffer instanceof ArrayBuffer).toBe(true);
        expect(GL.buffers.size).toEqual(1);

    });

});