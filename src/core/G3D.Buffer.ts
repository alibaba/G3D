import GL from './G3D.GL';

interface IBuffer {
    data: Float32Array | Uint32Array,
    target: string | number
}

class Buffer {

    glBuffer;

    constructor({ data, target }: IBuffer) {

        const { gl, buffers } = GL;

        if (typeof target === 'string') {
            target = gl[target];
        }

        const glBuffer = this.glBuffer = gl.createBuffer();

        gl.bindBuffer(target, glBuffer);
        gl.bufferData(target, data, gl.STATIC_DRAW);
        gl.bindBuffer(target, null);

        buffers.push(this);
    }

    destructor(): void {

        const { gl } = GL;

        gl.deleteBuffer(this.glBuffer);
    }
}

export default Buffer;