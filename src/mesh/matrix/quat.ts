import Mat3, { IMat3 } from "./mat3";
import Vec3, { IVec3 } from "./vec3";
import Vec4 from "./vec4";

export type IQuat = Float32Array;

// Creates a new identity quat
export function create(): IQuat {
    const out: IQuat = new Float32Array(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
}

// Set a quat to the identity quaternion
export function identity(out: IQuat): IQuat {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
}

// Sets a quat from the given angle and rotation axis, then returns it.
export function setAxisAngle(out: IQuat, axis: IVec3, rad: number): IQuat {
    rad = rad * 0.5;
    const s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
}

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 */
export function getAxisAngle(out_axis: IVec3, q: IQuat): number {
    const rad = Math.acos(q[3]) * 2.0;
    const s = Math.sin(rad / 2.0);
    if (s != 0.0) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
    } else {
        // If s is zero, return any axis (no rotation - axis does not matter)
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
    }
    return rad;
}

// Multiplies two quat's
export function multiply(out: IQuat, a: IQuat, b: IQuat): IQuat {
    const ax = a[0], ay = a[1], az = a[2], aw = a[3];
    const bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
}

// Rotates a quaternion by the given angle about the X axis
export function rotateX(out: IQuat, a: IQuat, rad: number): IQuat {
    rad *= 0.5;

    const ax = a[0], ay = a[1], az = a[2], aw = a[3];
    const bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
}

// Rotates a quaternion by the given angle about the Y axis
export function rotateY(out: IQuat, a: IQuat, rad: number): IQuat {
    rad *= 0.5;

    const ax = a[0], ay = a[1], az = a[2], aw = a[3];
    const by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
}

// Rotates a quaternion by the given angle about the Z axis
export function rotateZ(out: IQuat, a: IQuat, rad: number): IQuat {
    rad *= 0.5;

    const ax = a[0], ay = a[1], az = a[2], aw = a[3];
    const bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
}

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 */
export function calculateW(out: IQuat, a: IQuat): IQuat {
    const x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
}

// Performs a spherical linear interpolation between two quat
export function slerp(out: IQuat, a: IQuat, b: IQuat, t: number): IQuat {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    const ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];

    let omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if (cosom < 0.0) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ((1.0 - cosom) > 0.000001) {
        // standard case (slerp)
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {
        // "from" and "to" quaternions are very close
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
}

// Calculates the inverse of a quat
export function invert(out: IQuat, a: IQuat): IQuat {
    const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    const dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    const invDot = dot ? 1.0 / dot : 0;

    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 */
export function conjugate(out: IQuat, a: IQuat): IQuat {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
}

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 */
export function fromMat3(out: IQuat, m: IMat3): IQuat {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    const fTrace = m[0] + m[4] + m[8];
    let fRoot;

    if (fTrace > 0.0) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;  // 1/(4w)
        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
    } else {
        // |w| <= 1/2
        let i = 0;
        if (m[4] > m[0]) {
            i = 1;
        }
        if (m[8] > m[i * 3 + i]) {
            i = 2;
        }
        const j = (i + 1) % 3;
        const k = (i + 2) % 3;

        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
}

// Creates a quaternion from the given euler angle x, y, z.
export function fromEuler(out: IQuat, x: number, y: number, z: number): IQuat {
    const halfToRad = 0.5 * Math.PI / 180.0;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;

    const sx = Math.sin(x);
    const cx = Math.cos(x);
    const sy = Math.sin(y);
    const cy = Math.cos(y);
    const sz = Math.sin(z);
    const cz = Math.cos(z);

    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;

    return out;
}

// Returns a string representation of a quatenion
export function str(a: IQuat): string {
    return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}

// Creates a new quat initialized with values from an existing quaternion
export const clone = Vec4.clone;

// Creates a new quat initialized with the given values
export const fromValues = Vec4.fromValues;

// Copy the values from one quat to another
export const copy = Vec4.copy;

// Set the components of a quat to the given values
export const set = Vec4.set;

// Adds two quat's
export const add = Vec4.add;

/**
 * Alias for multiply
 */
export const mul = multiply;

// Scales a quat by a scalar number
export const scale = Vec4.scale;

// Calculates the dot product of two quat's
export const dot = Vec4.dot;

// Performs a linear interpolation between two quat's
export const lerp = Vec4.lerp;

// Calculates the length of a quat
export const length = Vec4.length;

// Alias for length
export const len = length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
export const squaredLength = Vec4.squaredLength;

// Alias for squaredLength
export const sqrLen = squaredLength;

// Normalize a quat
export const normalize = Vec4.normalize;

// Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
export const exactEquals = Vec4.exactEquals;

// Returns whether or not the quaternions have approximately the same elements in the same position.
export const equals = Vec4.equals;

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 */
export const rotationTo = (function() {
    const tmpvec3 = Vec3.create();
    const xUnitVec3 = Vec3.fromValues(1, 0, 0);
    const yUnitVec3 = Vec3.fromValues(0, 1, 0);

    return function(out: IQuat, a: IVec3, b: IVec3): IQuat {
        const dot = Vec3.dot(a, b);
        if (dot < -0.999999) {
            Vec3.cross(tmpvec3, xUnitVec3, a);
            if (Vec3.len(tmpvec3) < 0.000001) {
                Vec3.cross(tmpvec3, yUnitVec3, a);
            }
            Vec3.normalize(tmpvec3, tmpvec3);
            setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            Vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return normalize(out, out);
        }
    };
})();

// Performs a spherical linear interpolation with two control points
export const sqlerp = (function() {
    const temp1 = create();
    const temp2 = create();

    return function(out: IQuat, a: IQuat, b: IQuat, c: IQuat, d: IQuat, t: number): IQuat {
        slerp(temp1, a, d, t);
        slerp(temp2, b, c, t);
        slerp(out, temp1, temp2, 2 * t * (1 - t));

        return out;
    };
}());

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 */
export const setAxes = (function() {
    const matr = Mat3.create();

    return function(out: IVec3, view: IVec3, right: IVec3, up: IVec3): IQuat {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return normalize(out, fromMat3(out, matr));
    };
})();

// get euler angle x, y, z from given
export const getEuler = function(out: IVec3, q: IQuat): IVec3 {

    // TODO: make it clearer
    // const [q3, q2, q1, q0] = q;

    const q3 = q[0];
    const q2 = q[1];
    const q1 = q[2];
    const q0 = q[3];

    out[0] = Math.atan2(2 * (q0 * q3 + q1 * q2), 1 - 2 * (q2 * q2 + q3 * q3)) * 180 / Math.PI;
    out[1] = Math.asin(2 * (q0 * q2 - q3 * q1)) * 180 / Math.PI;
    out[2] = Math.atan2(2 * (q0 * q1 + q2 * q3), 1 - 2 * (q1 * q1 + q2 * q2)) * 180 / Math.PI;

    return out;
};

const Quat = {
    create,
    identity,
    setAxisAngle,
    getAxisAngle,
    multiply,
    rotateX,
    rotateY,
    rotateZ,
    calculateW,
    slerp,
    invert,
    conjugate,
    fromMat3,
    fromEuler,
    str,
    clone,
    fromValues,
    copy,
    set,
    add,
    mul,
    scale,
    dot,
    lerp,
    length,
    len,
    squaredLength,
    sqrLen,
    normalize,
    exactEquals,
    equals,
    rotationTo,
    sqlerp,
    setAxes,
    getEuler,
};

export default Quat;
