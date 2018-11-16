import GL from './G3D.GL';
import ElementBuffer from './G3D.ElementBuffer';

interface IElementBufferViewConfig {
    buffer: ElementBuffer;
    mode?: string | number;
    count?: number;
    type?: string | number;
    byteOffset?: number;
}

class ElementBufferView {

    readonly buffer: ElementBuffer;
    readonly mode: number;
    readonly count: number;
    readonly type: number;
    readonly byteOffset: number;

    constructor({ buffer, mode = 'TRIANGLES', count = 0, type = 'UNSIGNED_INT', byteOffset = 0 }: IElementBufferViewConfig) {

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
        this.byteOffset = byteOffset;
    }

}

export default ElementBufferView;