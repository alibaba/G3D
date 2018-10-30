import { IVec3 } from './G3D.Vec3';
import { IMat2 } from './G3D.Mat2';
import { IMat3 } from './G3D.Mat3';
import { IMat4 } from './G3D.Mat4';


export type IVec2 = Float32Array;

const EPSILON = 0.000001;

// Creates a new, empty vec2
export function create(): IVec2 {
    let out = new Float32Array(2);
    out[0] = 0;
    out[1] = 0;
    return out;
}


// Creates a new vec2 initialized with values from an existing vector
export function clone(a: IVec2): IVec2 {
    let out = new Float32Array(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
}


// Creates a new vec2 initialized with the given values
export function fromValues(x: number, y: number): IVec2 {
    let out = new Float32Array(2);
    out[0] = x;
    out[1] = y;
    return out;
}


// Copy the values from one vec2 to another
export function copy(out: IVec2, a: IVec2): IVec2 {
    out[0] = a[0];
    out[1] = a[1];
    return out;
}


// Set the components of a vec2 to the given values
export function set(out: IVec2, x: number, y: number): IVec2 {
    out[0] = x;
    out[1] = y;
    return out;
}


// Adds two vec2's
export function add(out: IVec2, a: IVec2, b: IVec2): IVec2 {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
}


// Subtracts vector b from vector a
export function subtract(out: IVec2, a: IVec2, b: IVec2): IVec2 {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}


// Multiplies two vec2's
export function multiply(out: IVec2, a: IVec2, b: IVec2): IVec2 {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};


// Divides two vec2's
export function divide(out: IVec2, a: IVec2, b: IVec2): IVec2 {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};


// Math.ceil the components of a vec2
export function ceil(out: IVec2, a: IVec2): IVec2 {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
};


// Math.floor the components of a vec2
export function floor(out: IVec2, a: IVec2): IVec2 {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
};


// Returns the minimum of two vec2's
export function min(out: IVec2, a: IVec2, b: IVec2): IVec2 {

    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};


// Returns the maximum of two vec2's
export function max(out: IVec2, a: IVec2, b: IVec2): IVec2 {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};


// Math.round the components of a vec2
export function round(out: IVec2, a: IVec2): IVec2 {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
};


// Scales a vec2 by a scalar number
export function scale(out: IVec2, a: IVec2, b: number): IVec2 {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};


// Adds two vec2's after scaling the second operand by a scalar value
export function scaleAndAdd(out: IVec2, a: IVec2, b: IVec2, scale: number): IVec2 {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};


// Calculates the euclidian distance between two vec2's
export function distance(a: IVec2, b: IVec2): number {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x * x + y * y);
};


// Calculates the squared euclidian distance between two vec2's
export function squaredDistance(a: IVec2, b: IVec2): number {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x * x + y * y;
};


// Calculates the length of a vec2
export function length(a: IVec2): number {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x * x + y * y);
};


// Calculates the squared length of a vec2
export function squaredLength(a: IVec2): number {
    var x = a[0],
        y = a[1];
    return x * x + y * y;
};


// Negates the components of a vec2
export function negate(out: IVec2, a: IVec2): IVec2 {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};


// Returns the inverse of the components of a vec2
export function inverse(out: IVec2, a: IVec2): IVec2 {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
};


// Normalize a vec2
export function normalize(out: IVec2, a: IVec2): IVec2 {
    var x = a[0],
        y = a[1];
    var len = x * x + y * y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};


// Calculates the dot product of two vec2's
export function dot(a: IVec2, b: IVec2): number {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 */
export function cross(out: IVec3, a: IVec2, b: IVec2): IVec3 {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};


// Performs a linear interpolation between two vec2's
export function lerp(out: IVec2, a: IVec2, b: IVec2, t: number): IVec2 {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};


// Generates a random vector with the given scale
export function random(out: IVec2, scale: number): IVec2 {
    scale = scale || 1.0;
    var r = Math.random() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};


// Transforms the vec2 with a mat2
export function transformMat2(out: IVec2, a: IVec2, m: IMat2): IVec2 {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};


/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 */
export function transformMat3(out: IVec2, a: IVec2, m: IMat3): IVec2 {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 */
export function transformMat4(out: IVec2, a: IVec2, m: IMat4): IVec2 {
    let x = a[0];
    let y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
}


// Returns a string representation of a vector
export function str(a: IVec2): string {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
}


// Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
export function exactEquals(a: IVec2, b: IVec2): boolean {
    return a[0] === b[0] && a[1] === b[1];
}


// Returns whether or not the vectors have approximately the same elements in the same position.
export function equals(a: IVec2, b: IVec2): boolean {
    let a0 = a[0], a1 = a[1];
    let b0 = b[0], b1 = b[1];
    return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)));
}


// Alias for length
export const len = length;


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


// Alias for squaredLength
export const sqrLen = squaredLength;


const Vec2 = {
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
    cross,
    lerp,
    random,
    // transformMat2,
    transformMat3,
    transformMat4,
    str,
    exactEquals,
    equals,
    len,
    sub,
    mul,
    div,
    dist,
    sqrDist,
    sqrLen,
}

export default Vec2;