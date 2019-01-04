export type IVec2 = Float32Array;

const EPSILON = 0.000001;

function create(): IVec2 {
    const out = new Float32Array(2);
    out[0] = 0;
    out[1] = 0;
    return out;
}

function fromValues(x: number, y: number): IVec2 {
    const out = new Float32Array(2);
    out[0] = x;
    out[1] = y;
    return out;
}

function copy(out: IVec2, a: IVec2): IVec2 {
    out[0] = a[0];
    out[1] = a[1];
    return out;
}

function set(out: IVec2, x: number, y: number): IVec2 {
    out[0] = x;
    out[1] = y;
    return out;
}

const Vec2 = {
    create,
    fromValues,
    copy,
    set,
};

export default Vec2;
