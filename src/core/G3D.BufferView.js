class BufferView {

    buffer = null;
    
    stride = null;
    offset = null;

    constructor({ buffer, stride = 0, offset = 0 }) {

        this.buffer = buffer;
        this.stride = stride;
        this.offset = offset;
    }

}

export default BufferView;