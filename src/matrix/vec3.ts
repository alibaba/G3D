import { IMat4 } from "./mat4";

export type IVec3 = Float32Array;

const EPSILON = 0.000001;

function create(): IVec3 {
  const out = new Float32Array(3);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}

function length(a: IVec3): number {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

function fromValues(...values: number[]);
function fromValues(x: number, y: number, z: number): IVec3 {
  const out = new Float32Array(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

function copy(out: IVec3, a: IVec3): IVec3 {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

function set(out: IVec3, x: number, y: number, z: number): IVec3 {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

function add(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}

function subtract(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}

function multiply(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}

function divide(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}

function scale(out: IVec3, a: IVec3, b: number): IVec3 {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}

function distance(a: IVec3, b: IVec3): number {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  const z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

function negate(out: IVec3, a: IVec3): IVec3 {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}

function normalize(out: IVec3, a: IVec3): IVec3 {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  let l = x * x + y * y + z * z;
  if (l > 0) {
    l = 1 / Math.sqrt(l);
    out[0] = a[0] * l;
    out[1] = a[1] * l;
    out[2] = a[2] * l;
  }
  return out;
}

function dot(a: IVec3, b: IVec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(out: IVec3, a: IVec3, b: IVec3): IVec3 {
  const ax = a[0], ay = a[1], az = a[2];
  const bx = b[0], by = b[1], bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

function transformMat4(out: IVec3, a: IVec3, m: IMat4): IVec3 {
  const x = a[0], y = a[1], z = a[2];
  let w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}

const Vec3 = {
  create,
  fromValues,
  set,
  copy,
  add,
  subtract,
  multiply,
  divide,
  scale,
  length,
  distance,
  negate,
  normalize,
  dot,
  cross,
  transformMat4,
};

export default Vec3;
