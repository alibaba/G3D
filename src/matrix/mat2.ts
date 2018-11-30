import { IVec2 } from "./vec2";

export type IMat2 = Float32Array;

const EPSILON = 0.000001;


// Creates a new identity mat2
export function create(): IMat2 {
    let out = new Float32Array(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
}


// Creates a new mat2 initialized with values from an existing matrix
export function clone(a: IMat2): IMat2 {
    let out = new Float32Array(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}


// Copy the values from one mat2 to another
export function copy(out: IMat2, a: IMat2): IMat2 {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}


// Set a mat2 to the identity matrix
export function identity(out: IMat2): IMat2 {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
}


// Create a new mat2 with the given values
export function fromValues(m00: number, m01: number, m10: number, m11: number): IMat2 {
    let out = new Float32Array(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
}


// Set the components of a mat2 to the given values
export function set(out: IMat2, m00: number, m01: number, m10: number, m11: number): IMat2 {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
}


// Transpose the values of a mat2
export function transpose(out: IMat2, a: IMat2): IMat2 {
    // If we are transposing ourselves we can skip a few steps but have to cache
    // some values
    if (out === a) {
        let a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }

    return out;
}


// Inverts a mat2
export function invert(out: IMat2, a: IMat2): IMat2 {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];

    // Calculate the determinant
    let det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] = a0 * det;

    return out;
}


// Calculates the adjugate of a mat2
export function adjoint(out: IMat2, a: IMat2): IMat2 {
    // Caching this value is nessecary if out == a
    let a0 = a[0];
    out[0] = a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a0;

    return out;
}


// Calculates the determinant of a mat2
export function determinant(a: IMat2): number {
    return a[0] * a[3] - a[2] * a[1];
}


// Multiplies two mat2's
export function multiply(out: IMat2, a: IMat2, b: IMat2): IMat2 {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
}


// Rotates a mat2 by the given angle
export function rotate(out: IMat2, a: IMat2, rad: number): IMat2 {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
}


// Scales the mat2 by the dimensions in the given vec2
export function scale(out: IMat2, a: IMat2, v: IVec2): IMat2 {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
}


// Creates a matrix from a given angle
export function fromRotation(out: IMat2, rad: number): IMat2 {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
}


// Creates a matrix from a vector scaling
export function fromScaling(out: IMat2, v: IVec2): IMat2 {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
}


// Returns a string representation of a mat2
export function str(a: IMat2): string {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}


// Returns Frobenius norm of a mat2
export function frob(a: IMat2): number {
    return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
}



// Adds two mat2's
export function add(out: IMat2, a: IMat2, b: IMat2): IMat2 {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
}


// Subtracts matrix b from matrix a
export function subtract(out: IMat2, a: IMat2, b: IMat2): IMat2 {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
}


// Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
export function exactEquals(a: IMat2, b: IMat2): boolean {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}


// Returns whether or not the matrices have approximately the same elements in the same position.
export function equals(a: IMat2, b: IMat2): boolean {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
        Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
        Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)));
}


// Multiply each element of the matrix by a scalar.
export function multiplyScalar(out: IMat2, a: IMat2, b: number): IMat2 {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
}


// Adds two mat2's after multiplying each element of the second operand by a scalar value.
export function multiplyScalarAndAdd(out: IMat2, a: IMat2, b: IMat2, scale: number): IMat2 {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
}


// Alias for multiply
export const mul = multiply;


// Alias for subtract
export const sub = subtract;





const Mat2 = {

    create,
    clone,
    copy,
    identity,
    fromValues,
    set,
    transpose,
    invert,
    adjoint,
    determinant,
    multiply,
    rotate,
    scale,
    fromRotation,
    fromScaling,
    str,
    frob,
    add,
    subtract,
    exactEquals,
    equals,
    multiplyScalar,
    multiplyScalarAndAdd,
    mul,
    sub,
}

export default Mat2;