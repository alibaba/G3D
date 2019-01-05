import Vec3, { IVec3 } from "./vec3";

export type IQuat = Float32Array;

function create(): IQuat {
    const out: IQuat = new Float32Array(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
}

function setAxisAngle(out: IQuat, axis: IVec3, rad: number): IQuat {
    rad = rad * 0.5;
    const s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
}

function getAxisAngle(outAxis: IVec3, q: IQuat): number {
    const rad = Math.acos(q[3]) * 2.0;
    const s = Math.sin(rad / 2.0);
    if (s !== 0.0) {
        outAxis[0] = q[0] / s;
        outAxis[1] = q[1] / s;
        outAxis[2] = q[2] / s;
    } else {
        outAxis[0] = 1;
        outAxis[1] = 0;
        outAxis[2] = 0;
    }
    return rad;
}

function fromEuler(out: IQuat, x: number, y: number, z: number): IQuat {
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

function getEuler(out: IVec3, q: IQuat): IVec3 {

    const q3 = q[0];
    const q2 = q[1];
    const q1 = q[2];
    const q0 = q[3];

    out[0] = Math.atan2(2 * (q0 * q3 + q1 * q2), 1 - 2 * (q2 * q2 + q3 * q3)) * 180 / Math.PI;
    out[1] = Math.asin(2 * (q0 * q2 - q3 * q1)) * 180 / Math.PI;
    out[2] = Math.atan2(2 * (q0 * q1 + q2 * q3), 1 - 2 * (q1 * q1 + q2 * q2)) * 180 / Math.PI;

    return out;
}

const Quat = {
    create,
    setAxisAngle,
    getAxisAngle,
    fromEuler,
    getEuler,
};

export default Quat;
