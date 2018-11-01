import Buffer from "./G3D.Buffer";

interface IBufferViewConfig {
    buffer: Buffer;
    stride?: number;
    offset?: number;
}


class BufferView {

    buffer: Buffer;
    stride: number;
    offset: number;

    constructor({ buffer, stride = 0, offset = 0 }: IBufferViewConfig) {

        this.buffer = buffer;
        this.stride = stride;
        this.offset = offset;
    }

}

export default BufferView;