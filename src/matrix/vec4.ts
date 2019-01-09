import { IMat4 } from "./mat4";
import { IQuat } from "./quat";

export type IVec4 = Float32Array;

const EPSILON = 0.000001;

function create(): IVec4 {
    const out = new Float32Array(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
}

function fromValues(...values: number[]);
function fromValues(x: number, y: number, z: number, w: number): IVec4 {
    const out = new Float32Array(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
}

function copy(out: IVec4, a: IVec4): IVec4 {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}

function set(out: IVec4, x: number, y: number, z: number, w: number): IVec4 {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
}

const Vec4 = {
    create,
    fromValues,
    copy,
    set,
};

export default Vec4;
