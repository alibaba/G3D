import GL from "../core/gl";

interface IBufferConfig {
    data: Float32Array | ArrayBuffer;
}

class Buffer {

    public readonly arrayBuffer: ArrayBuffer;
    public readonly glBuffer: WebGLBuffer;

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

    public destructor(): void {
        const { gl } = GL;
        gl.deleteBuffer(this.glBuffer);
    }
}

export default Buffer;
