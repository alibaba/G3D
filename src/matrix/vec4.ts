import { IMat4 } from "./mat4";
import { IQuat } from "./quat";

export type IVec4 = Float32Array;

const EPSILON = 0.000001;

// Creates a new, empty vec4
export function create(): IVec4 {
    const out = new Float32Array(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
}

// Creates a new vec4 initialized with values from an existing vector
export function clone(a: IVec4): IVec4 {
    const out = new Float32Array(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}

// Creates a new vec4 initialized with the given values
export function fromValues(x: number, y: number, z: number, w: number): IVec4 {
    const out = new Float32Array(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
}

// Copy the values from one vec4 to another
export function copy(out: IVec4, a: IVec4): IVec4 {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}

// Set the components of a vec4 to the given values
export function set(out: IVec4, x: number, y: number, z: number, w: number): IVec4 {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
}

// Adds two vec4's
export function add(out: IVec4, a: IVec4, b: IVec4): IVec4 {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
}

// Subtracts vector b from vector a
export function subtract(out: IVec4, a: IVec4, b: IVec4): IVec4 {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
}

// Multiplies two vec4's
export function multiply(out: IVec4, a: IVec4, b: IVec4): IVec4 {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
}

// Divides two vec4's
export function divide(out: IVec4, a: IVec4, b: IVec4): IVec4 {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
}

// Math.ceil the components of a vec4
export function ceil(out: IVec4, a: IVec4): IVec4 {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
}

// Math.floor the components of a vec4
export function floor(out: IVec4, a: IVec4): IVec4 {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
}

// Returns the minimum of two vec4's
export function min(out: IVec4, a: IVec4, b: IVec4): IVec4 {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
}

// Returns the maximum of two vec4's
export function max(out: IVec4, a: IVec4, b: IVec4): IVec4 {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
}

// Math.round the components of a vec4
export function round(out: IVec4, a: IVec4): IVec4 {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
}

// Scales a vec4 by a scalar number
export function scale(out: IVec4, a: IVec4, b: number): IVec4 {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
}

// Adds two vec4's after scaling the second operand by a scalar value
export function scaleAndAdd(out: IVec4, a: IVec4, b: IVec4, v: number): IVec4 {
    out[0] = a[0] + (b[0] * v);
    out[1] = a[1] + (b[1] * v);
    out[2] = a[2] + (b[2] * v);
    out[3] = a[3] + (b[3] * v);
    return out;
}

// Calculates the euclidian distance between two vec4's
export function distance(a: IVec4, b: IVec4): number {
    const x = b[0] - a[0];
    const y = b[1] - a[1];
    const z = b[2] - a[2];
    const w = b[3] - a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
}

// Calculates the squared euclidian distance between two vec4's
export function squaredDistance(a: IVec4, b: IVec4): number {
    const x = b[0] - a[0];
    const y = b[1] - a[1];
    const z = b[2] - a[2];
    const w = b[3] - a[3];
    return x * x + y * y + z * z + w * w;
}

// Calculates the length of a vec4
export function length(a: IVec4): number {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    const w = a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
}

// Calculates the squared length of a vec4
export function squaredLength(a: IVec4): number {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    const w = a[3];
    return x * x + y * y + z * z + w * w;
}

// Negates the components of a vec4
export function negate(out: IVec4, a: IVec4): IVec4 {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
}

// Returns the inverse of the components of a vec4
export function inverse(out: IVec4, a: IVec4): IVec4 {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    out[3] = 1.0 / a[3];
    return out;
}

// Normalize a vec4
export function normalize(out: IVec4, a: IVec4): IVec4 {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    const w = a[3];
    let l = x * x + y * y + z * z + w * w;
    if (l > 0) {
        l = 1 / Math.sqrt(l);
        out[0] = x * l;
        out[1] = y * l;
        out[2] = z * l;
        out[3] = w * l;
    }
    return out;
}

// Calculates the dot product of two vec4's
export function dot(a: IVec4, b: IVec4): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

// Performs a linear interpolation between two vec4's
export function lerp(out: IVec4, a: IVec4, b: IVec4, t: number): IVec4 {
    const ax = a[0];
    const ay = a[1];
    const az = a[2];
    const aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
}

// Generates a random vector with the given scale
export function random(out: IVec4, vectorScale: number): IVec4 {
    vectorScale = vectorScale || 1.0;

    // TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = Math.random();
    out[1] = Math.random();
    out[2] = Math.random();
    out[3] = Math.random();
    normalize(out, out);
    scale(out, out, vectorScale);
    return out;
}

// Transforms the vec4 with a mat4.
export function transformMat4(out: IVec4, a: IVec4, m: IMat4): IVec4 {
    const x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
}

// Transforms the vec4 with a quat
export function transformQuat(out: IVec4, a: IVec4, q: IQuat): IVec4 {
    const x = a[0], y = a[1], z = a[2];
    const qx = q[0], qy = q[1], qz = q[2], qw = q[3];

    // calculate quat * vec
    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
}

// Returns a string representation of a vector
export function str(a: IVec4): string {
    return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}

// Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
export function exactEquals(a: IVec4, b: IVec4): boolean {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

// Returns whether or not the vectors have approximately the same elements in the same position.
export function equals(a: IVec4, b: IVec4): boolean {
    const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    const b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
        Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
        Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)));
}

// Alias for subtract
export const sub = subtract;

// Alias for multiply
export const mul = multiply;

// Alias for divide
export const div = divide;

// Alias for distance
export const dist = distance;

// Alias for squaredDistance
export const sqrDist = squaredDistance;

// Alias for length
export const len = length;

// Alias for squaredLength
export const sqrLen = squaredLength;

const Vec4 = {
    create,
    clone,
    fromValues,
    copy,
    set,
    add,
    subtract,
    multiply,
    divide,
    ceil,
    floor,
    min,
    max,
    round,
    scale,
    scaleAndAdd,
    distance,
    squaredDistance,
    length,
    squaredLength,
    negate,
    inverse,
    normalize,
    dot,
    lerp,
    random,
    transformMat4,
    transformQuat,
    str,
    exactEquals,
    equals,
    sub,
    mul,
    div,
    dist,
    sqrDist,
    len,
    sqrLen,
};

export default Vec4;
