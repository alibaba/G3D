
import GL from "../core/gl";

interface IElementBufferConfig {
    data: Uint32Array | Uint16Array | ArrayBuffer;
}

class ElementBuffer {

    public readonly arrayBuffer: ArrayBuffer;
    public readonly glBuffer: WebGLBuffer;

    constructor({ data }: IElementBufferConfig) {

        const { gl, buffers } = GL;

        // create this.glBuffer
        this.glBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.glBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        // create this.arrayBuffer
        if (data instanceof Uint32Array || data instanceof Uint16Array) {
            this.arrayBuffer = data.buffer;
        } else if (data instanceof ArrayBuffer) {
            this.arrayBuffer = data;
        }

        // hook on GL
        buffers.add(this);
    }

    public destructor(): void {

        const { gl, buffers } = GL;

        buffers.delete(this);

        gl.deleteBuffer(this.glBuffer);
    }

}

export default ElementBuffer;
