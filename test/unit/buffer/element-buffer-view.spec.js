import ElementBufferView from "../../../src/buffer/element-buffer-view";
import ElementBuffer from "../../../src/buffer/element-buffer";
import GL from "../../../src/core/gl";

import { initWebGL } from '../../helpers/init';
import expect from "../../helpers/expect";


describe("ElementBufferView", function () {

    let buffer;
    let gl;

    before(function () {

        gl = initWebGL();
        GL.gl = gl;
        buffer = new ElementBuffer({
            data: new Uint16Array([1, 2, 3])
        })
    });

    after(function () {

        for (let buffer of GL.buffers) {
            buffer.destructor();
        }
    })

    it('create with mode TRIANGLES', function () {

        const bufferView = new ElementBufferView({
            buffer,
            mode: 'TRIANGLES',
            count: 3,
            type: 'UNSIGNED_SHORT',
            byteOffset: 0
        })

        expect(bufferView.mode === gl.TRIANGLES);
    });

    it('create with mode gl.TRIANGLES', function () {

        const bufferView = new ElementBufferView({
            buffer,
            mode: gl.TRIANGLES,
            count: 3,
            type: gl.UNSIGNED_SHORT,
            byteOffset: 0
        })

        expect(bufferView.mode === gl.TRIANGLES);
        expect(bufferView.type === gl.UNSIGNED_SHORT);
    });

});