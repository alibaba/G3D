import expect from '../helpers/expect';
import { initWebGL } from '../helpers/init';

import ElementBuffer from '../../src/buffer/element-buffer';
import GL from '../../src/core/gl';

describe('element buffer', function(){

    before(function(){

        const gl = initWebGL();
        GL.gl = gl;

    })

    afterEach(function(){

        for(let buffer of GL.buffers){
            buffer.destructor();
        }
    })

    it('create with uint32array', function(){

        const data = new Uint32Array([1,2,3]);

        const ebuffer = new ElementBuffer({
            data
        });

        expect(ebuffer.glBuffer instanceof WebGLBuffer).toBe(true);
        expect(ebuffer.arrayBuffer instanceof ArrayBuffer).toBe(true);
        expect(GL.buffers.size).toEqual(1);

    });

    it('create with arraybuffer', function(){

        const data = (new Uint32Array([1,2,3])).buffer;

        const ebuffer = new ElementBuffer({
            data
        });

        expect(ebuffer.glBuffer instanceof WebGLBuffer).toBe(true);
        expect(ebuffer.arrayBuffer instanceof ArrayBuffer).toBe(true);
        expect(GL.buffers.size).toEqual(1);

    })

})