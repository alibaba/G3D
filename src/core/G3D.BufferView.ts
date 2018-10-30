import Buffer from "./G3D.Buffer";

interface IBufferView {
    buffer: Buffer;
    stride?: number;
    offset?: number;
}


class BufferView {

    buffer: Buffer;
    stride: number;
    offset: number;

    constructor({ buffer, stride = 0, offset = 0 }: IBufferView) {

        this.buffer = buffer;
        this.stride = stride;
        this.offset = offset;
    }

}

export default BufferView;