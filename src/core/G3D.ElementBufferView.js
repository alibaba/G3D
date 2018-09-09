class ElementBufferView {

    buffer = null;

    mode = null;
    count = null;
    type = null;
    offset = null;

    constructor({ buffer, mode = 'TRIANGLES', count = 0, type = 'UNSIGNED_INT', offset = 0 }) {

        const { gl } = GL;

        this.buffer = buffer;

        if (typeof mode === 'String') {
            mode = gl[mode];
        }

        if (typeof type === 'String') {
            type = gl[type];
        }

        this.mode = mode;
        this.count = count;
        this.type = type;
        this.offset = offset;
    }

}

export default ElementBufferView;