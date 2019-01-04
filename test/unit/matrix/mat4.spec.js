import expect from '../../helpers/expect';

import Mat4 from '../../../src/matrix/mat4';
import Quat from '../../../src/matrix/quat';

describe('Mat4', function () {

    it('#create', function () {

        const mat = Mat4.create();

        expect(mat.length).toEqual(16);
        expect(mat).toEqualArray([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ])
    });

    it('#fromValues', function () {
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

    it('#copy', function () {
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

    it('#set', function () {

        const values = [
            1, 2, 3, 4,
            11, 12, 13, 14,
            31, 33, 35, 40,
            9, 8, 6, 5
        ];
        const mat = Mat4.create();
        Mat4.set(mat, ...values);
        expect(mat).toEqualArray(values);
    });

    it('#transpose', function () {

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

        Mat4.transpose(mat, mat);
        expect(mat).toEqualArray([
            1, 11, 31, 9,
            2, 12, 33, 8,
            3, 13, 35, 5,
            4, 14, 40, 5
        ]);

    });

    it('#multiply', function () {

        const mat1 = Mat4.fromValues(
            1, 0, 3, 1,
            2, 0, 3, -1,
            0, -1, 5, 3,
            0, 0, 1, 1
        );
        const mat2 = Mat4.fromValues(
            0, 3, 2, -2,
            3, 0, 0, 0,
            -1, 2, 1, 1,
            0, 0, 1, 1
        );

        const mat = Mat4.create();

        Mat4.multiply(mat, mat2, mat1);

        expect(mat).toEqualArray([
            -3, 9, 6, 2,
            -3, 12, 6, -2,
            -8, 10, 8, 8,
            -1, 2, 2, 2
        ]);

    });

    describe('#fromRotationTranslationScale', function () {

        it('identity', function () {
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
        });

        it('from rotation', function () {
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

        it('from translation', function () {
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
        });

        it('from scale', function () {
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
        });
    });

    it('#getTransaction', function () {

        const mat = Mat4.fromRotationTranslationScale(
            Mat4.create(),
            Quat.setAxisAngle(Quat.create(), [0, 0, 1], Math.PI * 0.3),
            [3, 2, 6],
            [3, 1, 2]
        );

        expect(Mat4.getTranslation(
            new Float32Array(3),
            mat
        )).toEqualArray([3, 2, 6]);

    });

    it('#getRotation', function () {

        rts(0, 0, 1, 90, 0, 0, 0, 1, 1, 1);
        rts(0, 0, 1, 110, 0, 0, 0, 1, 1, 1);
        rts(0, 0, 1, 180, 0, 0, 0, 1, 1, 1);
        rts(0, 0, 1, 190, 0, 0, 0, 1, 1, 1);
        rts(1, 0, 0, 190, 0, 0, 0, 1, 1, 1);
        rts(0, 1, 0, 190, 0, 0, 0, 1, 1, 1);
        rts(0.2, 1, 0.2, 190, 0, 0, 0, 1, 1, 1);

        function rts(x, y, z, w, tx, ty, tz, sx, sy, sz) {

            const len = Math.sqrt(x * x + y * y + z * z);
            x /= len;
            y /= len;
            z /= len;

            const mat = Mat4.fromRotationTranslationScale(
                Mat4.create(),
                Quat.setAxisAngle(Quat.create(), [x, y, z], w / 180 * Math.PI),
                [tx, ty, tz],
                [sx, sy, sz]
            );

            const trans = Mat4.getTranslation(
                new Float32Array(3),
                mat
            );
            const quat = Mat4.getRotation(
                Quat.create(),
                mat
            );
            const scale = Mat4.getScaling(
                new Float32Array(3),
                mat
            );

            expect(Mat4.fromRotationTranslationScale(
                Mat4.create(),
                quat,
                trans,
                scale
            )).toEqualArray(mat);

        }

        // expect(Mat4.fromRotationTranslationScale(
        //     Mat4.create(),
        //     quat,
        //     [3, 2, 6],
        //     [1, 1, 1]
        // )).toEqualArray(mat);

    });

    it('#getScale', function () {

        const mat = Mat4.fromRotationTranslationScale(
            Mat4.create(),
            Quat.setAxisAngle(Quat.create(), [0, 0, 1], 0),
            [3, 2, 6],
            [8, 4, 7]
        );

        expect(Mat4.getScaling(
            new Float32Array(3),
            mat
        )).toEqualArray([
            8, 4, 7
        ]);

    });

    it('#perspective', function () {

        const mat = Mat4.create();

        Mat4.perspective(mat, Math.PI * 0.5, 1, 1, 2);

        expect(mat).toEqualArray([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -3, -1,
            0, 0, -4, 0
        ]);

    });

    it('#ortho', function () {

        const mat = Mat4.create();

        Mat4.ortho(mat, -2, 2, -1, 1, 1, 2);

        expect(mat).toEqualArray([
            0.5, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -2, 0,
            0, 0, -3, 1
        ]);

    });

    describe('#lookAt', function(){

        it('normal', function () {
    
            const mat = Mat4.lookAt(Mat4.create(), [0, 0, 1], [0, 0, 0], [0, 1, 0]);
    
            expect(mat).toEqualArray([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, -1, 1
            ]);
    
        });

        it('when eye position are equal with target position', function(){

            const mat = Mat4.lookAt(Mat4.create(), [0, 1, 0], [0, 1, 0], [0, 1, 0]);
    
            expect(mat).toEqualArray([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);

        });

        it('when up vector is 0', function(){

            const mat = Mat4.lookAt(Mat4.create(), [0, 0, 1], [0, 0, 0], [0, 0, 0]);
    
            expect(mat).toEqualArray([
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 1, 0,
                0, 0, -1, 1
            ]);

        });

    });


    describe('#invert', function () {

        it('invertable', function () {

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
    
        it('uninvertable (det is 0)', function () {
    
            const values = [
                1, 2, 3, 4,
                5, 7, 8, 6,
                1, 2, 3, 4,
                0, 7, 13, 5
            ];
    
            const mat = Mat4.fromValues(...values);
    
            const matInverted = Mat4.create();
    
            expect(Mat4.invert(matInverted, mat)).toEqual(null);
    
        });
    });


});