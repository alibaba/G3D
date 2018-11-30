import ElementBuffer from "./element-buffer";
import GL from "./gl";

interface IElementBufferViewConfig {
    buffer: ElementBuffer;
    mode?: string | number;
    count?: number;
    type?: string | number;
    byteOffset?: number;
}

class ElementBufferView {

    public readonly buffer: ElementBuffer;
    public readonly mode: number;
    public readonly count: number;
    public readonly type: number;
    public readonly byteOffset: number;

    constructor({ buffer, mode = "TRIANGLES", count = 0, type = "UNSIGNED_INT", byteOffset = 0 }: IElementBufferViewConfig) {

        const { gl } = GL;

        this.buffer = buffer;

        if (typeof mode === "string") {
            this.mode = gl[mode];
        } else {
            this.mode = mode;
        }

        if (typeof type === "string") {
            this.type = gl[type];
        } else {
            this.type = type;
        }

        this.count = count;
        this.byteOffset = byteOffset;
    }
}

export default ElementBufferView;
