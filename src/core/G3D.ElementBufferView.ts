import GL from './G3D.GL';

import Buffer from './G3D.Buffer';

interface IElementBufferViewConfig {
    buffer: Buffer;
    mode?: string | number;
    count?: number;
    type?: string | number;
    offset?: number;
}

class ElementBufferView {

    buffer: Buffer;
    mode: number;
    count: number;
    type: number;
    offset: number;

    constructor({ buffer, mode = 'TRIANGLES', count = 0, type = 'UNSIGNED_INT', offset = 0 }: IElementBufferViewConfig) {

        const { gl } = GL;

        this.buffer = buffer;

        if (typeof mode === 'string') {
            mode = gl[mode] as number;
        }

        if (typeof type === 'string') {
            type = gl[type] as number;
        }

        this.mode = mode;
        this.count = count;
        this.type = type;
        this.offset = offset;
    }

}

export default ElementBufferView;