import GL from './G3D.GL';
import { IWebGLBuffer } from '../types/webgl';

interface IBufferConfig {
    data: Float32Array | ArrayBuffer
}

class Buffer {

    arrayBuffer: ArrayBuffer;
    glBuffer: IWebGLBuffer;

    constructor({ data }: IBufferConfig) {

        const { gl, buffers } = GL;

        // create this.glBuffer
        this.glBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        // create this.arrayBuffer
        if (data instanceof Float32Array) {
            this.arrayBuffer = data.buffer;
        } else if (data instanceof ArrayBuffer) {
            this.arrayBuffer = data;
        }

        // hook on GL
        buffers.push(this);
    }

    destructor(): void {
        const { gl } = GL;
        gl.deleteBuffer(this.glBuffer);
    }
}

export default Buffer;