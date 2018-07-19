import * as Quat from './gl-matrix/quat';

Quat.getEuler = function (out, q) {

    const [q3, q2, q1, q0] = q;

    out[2] = Math.atan2(2 * (q0 * q1 + q2 * q3), 1 - 2 * (q1 * q1 + q2 * q2)) * 180 / Math.PI;
    out[1] = Math.asin(2 * (q0 * q2 - q3 * q1)) * 180 / Math.PI;
    out[0] = Math.atan2(2 * (q0 * q3 + q1 * q2), 1 - 2 * (q2 * q2 + q3 * q3)) * 180 / Math.PI;

    return out;
};


export default Quat;