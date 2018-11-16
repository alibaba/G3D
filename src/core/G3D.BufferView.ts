import Buffer from "./G3D.Buffer";

interface IBufferViewConfig {
    buffer: Buffer;
    byteStride?: number;
    byteOffset?: number;
}


class BufferView {

    readonly buffer: Buffer;
    readonly byteStride: number;
    readonly byteOffset: number;

    constructor({ buffer, byteStride = 0, byteOffset = 0 }: IBufferViewConfig) {

        this.buffer = buffer;
        this.byteStride = byteStride;
        this.byteOffset = byteOffset;
    }

}

export default BufferView;