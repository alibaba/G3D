
import GL from "../core/gl";

interface IElementBufferConfig {
    data: Uint32Array | Uint16Array | ArrayBuffer;
}

class ElementBuffer {

    public readonly arrayBuffer: ArrayBuffer;
    public readonly glBuffer: WebGLBuffer;
    public readonly u32: boolean = false;

    constructor({ data }: IElementBufferConfig) {

        const { gl, buffers, extensions } = GL;

        // create this.glBuffer
        this.glBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.glBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        // create this.arrayBuffer
        if (data instanceof Uint32Array || data instanceof Uint16Array) {
            if (data instanceof Uint32Array) {
                if (!extensions.get("ELE_UNIT")) {
                    throw new Error(
                        "Element index unit extension not supported, can not use Uint32Array for element buffer.",
                    );
                }
                this.u32 = true;
            }
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
