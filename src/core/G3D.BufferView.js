class BufferView {

    buffer = null;

    stride = 0;
    offset = 0;

    constructor({ buffer, stride = 0, offset = 0 }) {

        this.buffer = buffer.glBuffer;

        this.stride = stride;
        this.offset = offset;

    }

}

export default BufferView;