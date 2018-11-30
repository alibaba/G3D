import { IMat3 } from "./mat3";
import { IMat4 } from "./mat4";
import { IQuat } from "./quat";

export type IVec3 = Float32Array;

const EPSILON = 0.000001;

// Creates a new, empty vec3
export function create(): IVec3 {
  const out = new Float32Array(3);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}

// Creates a new vec3 initialized with values from an existing vecto
export function clone(a: IVec3): IVec3 {
  const out = new Float32Array(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

// Calculates the length of a vec3
export function length(a: IVec3): number {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

// Creates a new vec3 initialized with the given values
export function fromValues(x: number, y: number, z: number): IVec3 {
  const out = new Float32Array(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

// Copy the values from one vec3 to another
export function copy(out: IVec3, a: IVec3): IVec3 {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

// Set the components of a vec3 to the given values
export function set(out: IVec3, x: number, y: number, z: number): IVec3 {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

// Adds two vec3's
export function add(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}

// Subtracts vector b from vector a
export function subtract(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}

// Multiplies two vec3's
export function multiply(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}

// Divides two vec3's
export function divide(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}

// Math.ceil the components of a vec3
export function ceil(out: IVec3, a: IVec3): IVec3 {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}

// Math.floor the components of a vec3
export function floor(out: IVec3, a: IVec3): IVec3 {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}

// Returns the minimum of two vec3's
export function min(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}

// Returns the maximum of two vec3's
export function max(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}

// Math.round the components of a vec3
export function round(out: IVec3, a: IVec3): IVec3 {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}

// Scales a vec3 by a scalar number
export function scale(out: IVec3, a: IVec3, b: number): IVec3 {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}

// Adds two vec3's after scaling the second operand by a scalar value
export function scaleAndAdd(out: IVec3, a: IVec3, b: IVec3, scale: number): IVec3 {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  return out;
}

// Calculates the euclidian distance between two vec3's
export function distance(a: IVec3, b: IVec3): number {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  const z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

// Calculates the squared euclidian distance between two vec3's
export function squaredDistance(a: IVec3, b: IVec3): number {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  const z = b[2] - a[2];
  return x * x + y * y + z * z;
}

// Calculates the squared length of a vec3
export function squaredLength(a: IVec3): number {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  return x * x + y * y + z * z;
}

// Negates the components of a vec3
export function negate(out: IVec3, a: IVec3): IVec3 {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}

// Returns the inverse of the components of a vec3
export function inverse(out: IVec3, a: IVec3): IVec3 {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}

// Normalize a vec3
export function normalize(out: IVec3, a: IVec3): IVec3 {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  let len = x * x + y * y + z * z;
  if (len > 0) {
    // TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
  }
  return out;
}

// Calculates the dot product of two vec3's
export function dot(a: IVec3, b: IVec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

// Computes the cross product of two vec3's
export function cross(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  const ax = a[0], ay = a[1], az = a[2];
  const bx = b[0], by = b[1], bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

// Performs a linear interpolation between two vec3's
export function lerp(out: IVec3, a: IVec3, b: IVec3, t: number): IVec3 {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}

// Performs a hermite interpolation with two control points
export function hermite(out: IVec3, a: IVec3, b: IVec3, c: IVec3, d: IVec3, t: number): IVec3 {
  const factorTimes2 = t * t;
  const factor1 = factorTimes2 * (2 * t - 3) + 1;
  const factor2 = factorTimes2 * (t - 2) + t;
  const factor3 = factorTimes2 * (t - 1);
  const factor4 = factorTimes2 * (3 - 2 * t);

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

// Performs a bezier interpolation with two control points
export function bezier(out: IVec3, a: IVec3, b: IVec3, c: IVec3, d: IVec3, t: number): IVec3 {
  const inverseFactor = 1 - t;
  const inverseFactorTimesTwo = inverseFactor * inverseFactor;
  const factorTimes2 = t * t;
  const factor1 = inverseFactorTimesTwo * inverseFactor;
  const factor2 = 3 * t * inverseFactorTimesTwo;
  const factor3 = 3 * factorTimes2 * inverseFactor;
  const factor4 = factorTimes2 * t;

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

// Generates a random vector with the given scale
export function random(out: IVec3, scale: number): IVec3 {
  scale = scale || 1.0;

  const r = Math.random() * 2.0 * Math.PI;
  const z = (Math.random() * 2.0) - 1.0;
  const zScale = Math.sqrt(1.0 - z * z) * scale;

  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 */
export function transformMat4(out: IVec3, a: IVec3, m: IMat4): IVec3 {
  const x = a[0], y = a[1], z = a[2];
  let w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}

/**
 * Transforms the vec3 with a mat3.
 */
export function transformMat3(out: IVec3, a: IVec3, m: IMat3): IVec3 {
  const x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}

// Transforms the vec3 with a quat
export function transformQuat(out: IVec3, a: IVec3, q: IQuat): IVec3 {
  // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

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
  return out;
}

// Rotate a 3D vector around the x-axis
export function rotateX(out: IVec3, a: IVec3, b: IVec3, c: number): IVec3 {
  const p = [], r = [];
  // Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  // perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
  r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

  // translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

// Rotate a 3D vector around the y-axis
export function rotateY(out: IVec3, a: IVec3, b: IVec3, c: number): IVec3 {
  const p = [], r = [];
  // Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  // perform rotation
  r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

  // translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

// Rotate a 3D vector around the z-axis
export function rotateZ(out: IVec3, a: IVec3, b: IVec3, c: number): IVec3 {
  const p = [], r = [];
  // Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  // perform rotation
  r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
  r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
  r[2] = p[2];

  // translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

// Get the angle between two 3D vectors
export function angle(a: IVec3, b: IVec3): number {
  const tempA = fromValues(a[0], a[1], a[2]);
  const tempB = fromValues(b[0], b[1], b[2]);

  normalize(tempA, tempA);
  normalize(tempB, tempB);

  const cosine = dot(tempA, tempB);

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}

// Returns a string representation of a vector
export function str(a: IVec3): string {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}

// Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
export function exactEquals(a: IVec3, b: IVec3): boolean {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

// Returns whether or not the vectors have approximately the same elements in the same position.
export function equals(a: IVec3, b: IVec3): boolean {
  const a0 = a[0], a1 = a[1], a2 = a[2];
  const b0 = b[0], b1 = b[1], b2 = b[2];
  return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
    Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
    Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)));
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

const Vec3 = {
  create,
  clone,
  length,
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
  squaredLength,
  negate,
  inverse,
  normalize,
  dot,
  cross,
  lerp,
  hermite,
  bezier,
  random,
  transformMat4,
  transformMat3,
  transformQuat,
  rotateX,
  rotateY,
  rotateZ,
  angle,
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

export default Vec3;
