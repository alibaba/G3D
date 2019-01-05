import expect from '../../helpers/expect';

import Quat from '../../../src/matrix/quat';

describe('Quat', function () {

    it('#create', function () {

        expect(Quat.create()).toEqualArray([
            0, 0, 0, 1
        ]);

    });

    it('#setAxisAngle', function () {

        expect(Quat.setAxisAngle(Quat.create(), [0, 0, 1], Math.PI)).toEqualArray([
            0, 0, 1, 0
        ]);

        expect(Quat.setAxisAngle(Quat.create(), [0, 1, 0], Math.PI / 2)).toEqualArray([
            0, Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2
        ]);

    });

    it('#getAxisAngle', function () {

        axisAngle([0, 0, 1], 90);
        axisAngle([0, 1, 0], 90);
        axisAngle([1, 0, 0], 90);
        axisAngle([1, 0, 0], 0);

        function axisAngle(axis, angle) {

            angle = angle / 180 * Math.PI;

            const quat = Quat.setAxisAngle(Quat.create(), axis, angle);

            const axisRes = new Float32Array(3);
            const angleRes = Quat.getAxisAngle(axisRes, quat);

            expect(axisRes).toEqualArray(axis);
            expect(angleRes).toEqualFloat(angle);
        }

    });

    it('#fromEuler', function () {

        expect(
            Quat.fromEuler(Quat.create(), 0, 0, 0)
        ).toEqualArray(
            Quat.setAxisAngle(Quat.create(), [0, 0, 1], 0)
        );

        expect(
            Quat.fromEuler(Quat.create(), 90, 0, 0)
        ).toEqualArray(
            Quat.setAxisAngle(Quat.create(), [1, 0, 0], Math.PI / 2)
        );

        expect(
            Quat.fromEuler(Quat.create(), 0, 90, 0)
        ).toEqualArray(
            Quat.setAxisAngle(Quat.create(), [0, 1, 0], Math.PI / 2)
        );

    });

    it('#getEuler', function () {

        const quat = Quat.fromEuler(Quat.create(), 90, 0, 0);

        expect(
            Quat.getEuler(new Float32Array(3), quat)
        ).toEqualArray(
            [90, 0, 0]
        );

    });


});