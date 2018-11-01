import GL from './G3D.GL';
import { IWebGLEnum } from '../types/webgl';

interface IBufferConfig {
    data: Float32Array | Uint32Array,
    target: string | number
}

class Buffer {

    glBuffer;

    constructor({ data, target }: IBufferConfig) {

        const { gl, buffers } = GL;

        if (typeof target === 'string') {
            target = gl[target];
        }

        const glBuffer = this.glBuffer = gl.createBuffer();

        gl.bindBuffer(target as IWebGLEnum, glBuffer);
        gl.bufferData(target as IWebGLEnum, data, gl.STATIC_DRAW);
        gl.bindBuffer(target as IWebGLEnum, null);

        buffers.push(this);
    }

    destructor(): void {

        const { gl } = GL;

        gl.deleteBuffer(this.glBuffer);
    }
}

export default Buffer;