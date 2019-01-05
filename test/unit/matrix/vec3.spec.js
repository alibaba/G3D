import expect from '../../helpers/expect';

import Vec3 from '../../../src/matrix/vec3';
import Mat4 from '../../../src/matrix/mat4';
import Quat from '../../../src/matrix/quat';


describe('Vec3', function () {

    it('#create', function () {
        expect(Vec3.create()).toEqualArray([
            0, 0, 0
        ])
    });

    it('#fromValues', function () {
        expect(Vec3.fromValues(1, 2, 3)).toEqualArray([1, 2, 3]);
    });

    it('#set', function () {
        expect(Vec3.set(Vec3.create(), 1, 2, 3)).toEqualArray([1, 2, 3]);
    });

    it('#copy', function () {
        expect(Vec3.copy(Vec3.create(), Vec3.fromValues(1, 2, 3))).toEqualArray([1, 2, 3]);
    });

    it('#add', function () {
        expect(
            Vec3.add(
                Vec3.create(),
                Vec3.fromValues(1, 2, 3),
                Vec3.fromValues(9, 11, 13)
            )
        ).toEqualArray([10, 13, 16]);
    });

    it('#subtract', function () {
        expect(
            Vec3.subtract(
                Vec3.create(),
                Vec3.fromValues(4, 5, 4),
                Vec3.fromValues(1, 3, 3)
            )
        ).toEqualArray([3, 2, 1]);
    });

    it('#multiply', function () {
        expect(
            Vec3.multiply(
                Vec3.create(),
                Vec3.fromValues(4, 5, 4),
                Vec3.fromValues(1, 3, 3)
            )
        ).toEqualArray([4, 15, 12]);
    });

    it('#divide', function () {
        expect(
            Vec3.divide(
                Vec3.create(),
                Vec3.fromValues(4, 12, 18),
                Vec3.fromValues(4, 4, 3)
            )
        ).toEqualArray([1, 3, 6]);
    });

    it('#scale', function () {
        expect(
            Vec3.scale(
                Vec3.create(),
                Vec3.fromValues(2, 3, 5),
                3
            )
        ).toEqualArray([6, 9, 15]);
    });

    it('#length', function () {
        expect(
            Vec3.length(
                Vec3.fromValues(3, 4, 0),
            )
        ).toEqual(5);
    });

    it('#distance', function () {
        expect(
            Vec3.distance(
                Vec3.fromValues(3, 4, 7),
                Vec3.fromValues(0, 0, 7),
            )
        ).toEqual(5);
    });

    it('#negtive', function () {
        expect(
            Vec3.negate(
                Vec3.create(),
                Vec3.fromValues(1, 2, -3),
            )
        ).toEqualArray([-1, -2, 3]);
    });

    it('#normalize', function () {
        expect(
            Vec3.normalize(
                Vec3.create(),
                Vec3.fromValues(3, 4, 0),
            )
        ).toEqualArray([0.6, 0.8, 0]);
    });

    it('#dot', function () {
        expect(
            Vec3.dot(
                Vec3.fromValues(3, 4, 0),
                Vec3.fromValues(2, 1, 5),
            )
        ).toEqual(10);
    });

    it('#cross', function () {

        expect(
            Vec3.cross(
                Vec3.create(),
                Vec3.fromValues(1, 0, 0),
                Vec3.fromValues(0, 0, -1),
            )
        ).toEqualArray([0, 1, 0]);

    });

    it('#transformMat4', function () {

        expect(
            Vec3.transformMat4(
                Vec3.create(),
                Vec3.fromValues(1, 0, 0),
                Mat4.fromRotationTranslationScale(
                    Mat4.create(),
                    Quat.setAxisAngle(Quat.create(), [0, 1, 0], Math.PI / 2),
                    [0, 0, 0],
                    [1, 1, 1]
                )
            )
        ).toEqualArray([0, 0, -1]);

        expect(
            Vec3.transformMat4(
                Vec3.create(),
                Vec3.fromValues(0, 0, 0),
                Mat4.fromRotationTranslationScale(
                    Mat4.create(),
                    Quat.setAxisAngle(Quat.create(), [0, 1, 0], Math.PI / 2),
                    [0, 0, 0],
                    [1, 1, 1]
                )
            )
        ).toEqualArray([0, 0, 0]);

    });

});