import ShaderMaterial from '../shader-material';

import * as fragmentShaderSource from "../../shaders/extra/material-metal.frag.glsl";
import * as vertexShaderSource from "../../shaders/extra/material-metal.vert.glsl";
import Texture from '../../texture/texture';
import G3D from '../..';
import Engine from '../../core/engine';

class MetalMaterial extends ShaderMaterial {


    texture: Texture;

    constructor(image) {

        super({
            name: "G3D_EXTRA_METAL",
            vertexShaderSource,
            fragmentShaderSource,
            macros: [],
            uniforms: [
                'uViewTSR',
                'uEnv'
            ],
            lighting: false,
            shadow: false,
            camera: false,
            passes: [
                {
                    depthTest: true,
                    blend: false,
                    cullFace: true,
                    uniforms: [],
                }
            ]
        });

        this.texture = new Texture({ image });
    }



    public uniform(name: string): Float32Array | WebGLTexture {
        switch (name) {
            case "uViewTSR":
                return this.getViewTSR();
            case "uEnv":
                return this.getEnv();
            default:
                return super.uniform(name);
        }
    }

    private getViewTSR(): Float32Array {

        const viewMatrix = Engine.instance.currentScene.activeCamera.getVMatrix();

        const res = new Float32Array(9);

        tsr(viewMatrix, res);

        return res;

        function tsr(r, t) {

            tsq2tsr(
                matrix_to_trans(r),
                matrix_to_scale(r),
                matrix_to_quat(r),
                t
            );

            function tsq2tsr(r, t, n, a) {
                return a[0] = r[0], a[1] = r[1], a[2] = r[2], a[3] = t, a[4] = n[0], a[5] = n[1], a[6] = n[2], a[7] = n[3], a;
            }

            function matrix_to_trans(t) {
                const r = new Float32Array(3);
                r[0] = t[12];
                r[1] = t[13];
                r[2] = t[14];
                return r;
            }

            function matrix_to_scale(t) {
                const v = new Float32Array([
                    .577350269189626,
                    .577350269189626,
                    .577350269189626,
                    0
                ]);
                transformMat4(v, t, v);
                return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]);
            }

            function matrix_to_quat(t) {
                const J = new Float32Array(9);
                fromMat4(t, J);

                var a = J[0],
                    n = J[3],
                    e = J[6],
                    o = J[1],
                    i = J[4],
                    u = J[7],
                    c = J[2],
                    s = J[5],
                    f = J[8],
                    l = Math.sqrt(a * a + n * n + e * e) || 1,
                    _ = Math.sqrt(o * o + i * i + u * u) || 1,
                    h = Math.sqrt(c * c + s * s + f * f) || 1;

                const r = new Float32Array(4);

                return J[0] /= l, J[3] /= l, J[6] /= l, J[1] /= _, J[4] /= _, J[7] /= _, J[2] /= h, J[5] /= h, J[8] /= h, fromMat3(J, r), normalize(r, r), r;
            }

            function fromMat3(t, n) {
                var r, a = t[0] + t[4] + t[8];
                if (a > 0) r = Math.sqrt(a + 1), n[3] = .5 * r, r = .5 / r, n[0] = (t[5] - t[7]) * r, n[1] = (t[6] - t[2]) * r, n[2] = (t[1] - t[3]) * r;
                else {
                    var e = 0;
                    t[4] > t[0] && (e = 1), t[8] > t[3 * e + e] && (e = 2);
                    var u = (e + 1) % 3,
                        o = (e + 2) % 3;
                    r = Math.sqrt(t[3 * e + e] - t[3 * u + u] - t[3 * o + o] + 1), n[e] = .5 * r, r = .5 / r, n[3] = (t[3 * u + o] - t[3 * o + u]) * r, n[u] = (t[3 * u + e] + t[3 * e + u]) * r, n[o] = (t[3 * o + e] + t[3 * e + o]) * r
                }
                return n;
            }

            function fromMat4(t, n) {
                return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[4], n[4] = t[5], n[5] = t[6], n[6] = t[8], n[7] = t[9], n[8] = t[10], n;
            }

            // function transformMat4(t, n, r) {
            //     var a = t[0],
            //         e = t[1],
            //         u = t[2],
            //         o = n[3] * a + n[7] * e + n[11] * u + n[15];
            //     o = o || 1;
            //     r[0] = (n[0] * a + n[4] * e + n[8] * u + n[12]) / o;
            //     r[1] = (n[1] * a + n[5] * e + n[9] * u + n[13]) / o;
            //     r[2] = (n[2] * a + n[6] * e + n[10] * u + n[14]) / o;
            //     return r;
            // }

            function transformMat4(t, n, r) {
                var a = t[0],
                    e = t[1],
                    u = t[2],
                    o = t[3];
                return r[0] = n[0] * a + n[4] * e + n[8] * u + n[12] * o, r[1] = n[1] * a + n[5] * e + n[9] * u + n[13] * o, r[2] = n[2] * a + n[6] * e + n[10] * u + n[14] * o, r[3] = n[3] * a + n[7] * e + n[11] * u + n[15] * o, r
            }

            function normalize(t, n) {
                var r = t[0],
                    a = t[1],
                    e = t[2],
                    u = r * r + a * a + e * e;
                return u > 0 && (u = 1 / Math.sqrt(u), n[0] = t[0] * u, n[1] = t[1] * u, n[2] = t[2] * u), n;
            }
        }

        // const v = new Float32Array([
        //     -0.9999998807907104, -1.2246465878873718e-16, -5.9021365971451115e-24, 0,
        //     1.169505140067811e-16, -0.9549735188484192, 0.29669076204299927, 0,
        //     -3.6334136708240805e-17, 0.29669076204299927, 0.9549736380577087, 0,
        //     9.083463039527522e-18, -0.07417195290327072, -27.20284080505371, 1
        // ]);
        // const t = new Float32Array(9);
    }

    private getEnv(): WebGLTexture {
        return this.texture.glTexture;
    }
}

export default MetalMaterial;