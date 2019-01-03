import G3D from '../../helpers/g3d';
import expect from '../../helpers/expect';

const { Mat4, Quat } = G3D;

describe('matrix mat4', function () {

    it('create', function () {

        const mat = Mat4.create();

        expect(mat.length).toEqual(16);
        expect(mat).toEqualArray([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ])
    });

    it('fromValues', function () {
        const values = [
            1, 2, 3, 4,
            11, 12, 13, 14,
            31, 33, 35, 40,
            9, 8, 6, 5
        ];
        const mat = Mat4.fromValues(...values);
        expect(mat.length).toEqual(16);
        expect(mat).toEqualArray(values);
    });

    it('copy', function () {
        const values = [
            1, 2, 3, 4,
            11, 12, 13, 14,
            31, 33, 35, 40,
            9, 8, 6, 5
        ];
        const mat = Mat4.fromValues(...values);
        const matCopied = Mat4.create();

        Mat4.copy(matCopied, mat);

        expect(matCopied).toEqualArray(values);
    });

    it('set', function () {

        const values = [
            1, 2, 3, 4,
            11, 12, 13, 14,
            31, 33, 35, 40,
            9, 8, 6, 5
        ];
        const mat = Mat4.create();
        Mat4.set(mat, ...values);
        expect(mat).toEqualArray(values);
    })

    it('transpose', function () {

        const values = [
            1, 2, 3, 4,
            11, 12, 13, 14,
            31, 33, 35, 40,
            9, 8, 6, 5
        ];

        const mat = Mat4.fromValues(values);
        const matTransposed = Mat4.create();

        Mat4.transpose(matTransposed, mat);

        expect(matTransposed).toEqualArray([
            1, 11, 31, 9,
            2, 12, 33, 8,
            3, 13, 35, 5,
            4, 14, 40, 5
        ]);

    });

    it('multiply', function () {

        const mat_1 = Mat4.fromValues(
            1, 0, 3, 1,
            2, 0, 3, -1,
            0, -1, 5, 3,
            0, 0, 1, 1
        );
        const mat_2 = Mat4.fromValues(
            0, 3, 2, -2,
            3, 0, 0, 0,
            -1, 2, 1, 1,
            0, 0, 1, 1
        );

        const mat = Mat4.create();

        Mat4.multiply(mat, mat_2, mat_1);

        expect(mat).toEqualArray([
            -3, 9, 6, 2,
            -3, 12, 6, -2,
            -8, 10, 8, 8,
            -1, 2, 2, 2
        ]);

    });

    it('from rotation translation scale', function () {

        expect(Mat4.fromRotationTranslationScale(
            Mat4.create(),
            Quat.setAxisAngle(Quat.create(), [0, 0, 1], 0),
            [0, 0, 0],
            [1, 1, 1]
        )).toEqualArray([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);

        expect(Mat4.fromRotationTranslationScale(
            Mat4.create(),
            Quat.setAxisAngle(Quat.create(), [0, 0, 1], 0),
            [3, 5, 2],
            [1, 1, 1]
        )).toEqualArray([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            3, 5, 2, 1
        ]);

        expect(Mat4.fromRotationTranslationScale(
            Mat4.create(),
            Quat.setAxisAngle(Quat.create(), [0, 0, 1], 0),
            [0, 0, 0],
            [2, 1, 2]
        )).toEqualArray([
            2, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 2, 0,
            0, 0, 0, 1
        ]);


        expect(Mat4.fromRotationTranslationScale(
            Mat4.create(),
            Quat.setAxisAngle(Quat.create(), [0, 0, 1], Math.PI / 2),
            [0, 0, 0],
            [1, 1, 1]
        )).toEqualArray([
            0, 1, 0, 0,
            -1, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);

    });

    it('get translation - scale - rotation', function () {

        const mat = Mat4.create();

        Mat4.fromRotationTranslationScale(
            mat,
            Quat.setAxisAngle(Quat.create(), [0, 0, 1], Math.PI * 0.3),
            [3, 2, 6],
            [3, 1, 2]
        );

        expect(Mat4.getTranslation(
            new Float32Array(3),
            mat
        )).toEqualArray([3, 2, 6]);

        expect(Mat4.getScaling(
            new Float32Array(3),
            mat
        )).toEqualArray([3, 1, 2]);

        Mat4.fromRotationTranslationScale(
            mat,
            Quat.setAxisAngle(Quat.create(), [0, 0, 1], Math.PI * 0.3),
            [3, 2, 6],
            [1, 1, 1]
        );

        expect(Mat4.getTranslation(
            new Float32Array(3),
            mat
        )).toEqualArray([3, 2, 6]);

        expect(Mat4.getRotation(
            new Float32Array(4),
            mat
        )).toEqualArray(Quat.setAxisAngle(Quat.create(), [0, 0, 1], Math.PI * 0.3));

    });

    it('perspective projection', function () {

        const mat = Mat4.create();

        Mat4.perspective(mat, Math.PI * 0.5, 1, 1, 2);

        expect(mat).toEqualArray([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -3, -1,
            0, 0, -4, 0
        ]);

    });

    it('ortho projection', function () {

        const mat = Mat4.create();

        Mat4.ortho(mat, -2, 2, -1, 1, 1, 2);

        expect(mat).toEqualArray([
            0.5, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -2, 0,
            0, 0, -3, 1
        ]);

    });

    it('look at', function () {

        const mat = Mat4.create();

        Mat4.lookAt(mat, [0, 0, 1], [0, 0, 0], [0, 1, 0]);

        expect(mat).toEqualArray([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -1, 1
        ]);

    });

    it('invert', function () {

        const values = [
            1, 2, 3, 4,
            5, 7, 8, 6,
            2, 2, 1, 9,
            0, 7, 13, 5
        ];

        const mat = Mat4.fromValues(...values);

        const matInverted = Mat4.create();

        Mat4.invert(matInverted, mat);

        expect(Mat4.multiply(Mat4.create(), mat, matInverted)).toEqualArray([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);

    });

});