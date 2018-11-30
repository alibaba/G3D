import Buffer from "./buffer";

interface IBufferViewConfig {
    buffer: Buffer;
    byteStride?: number;
    byteOffset?: number;
}

class BufferView {

    public readonly buffer: Buffer;
    public readonly byteStride: number;
    public readonly byteOffset: number;

    constructor({ buffer, byteStride = 0, byteOffset = 0 }: IBufferViewConfig) {

        this.buffer = buffer;
        this.byteStride = byteStride;
        this.byteOffset = byteOffset;
    }

}

export default BufferView;
