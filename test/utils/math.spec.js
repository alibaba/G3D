import expect from '../_helpers/expect';

import { rad2deg, deg2rad, isPowerOf2 } from '../../src/utils/math';

describe('utils/math', function () {

    it('rad2deg should work', function () {

        expect(rad2deg(Math.PI)).toEqualFloat(180);

        expect(rad2deg(Math.PI * 1.5)).toEqualFloat(270);

        expect(rad2deg(-Math.PI / 3)).toEqualFloat(-60);

        expect(rad2deg(0)).toEqualFloat(0);

    })

    it('deg2rad should work', function () {

        expect(deg2rad(180)).toEqualFloat(Math.PI);

        expect(deg2rad(270)).toEqualFloat(Math.PI * 1.5);

        expect(deg2rad(-60)).toEqualFloat(-Math.PI / 3);

        expect(deg2rad(0)).toEqualFloat(0);

    })

    it('isPowerOf2 should work', function () {

        expect(isPowerOf2(1)).toEqual(true);

        expect(isPowerOf2(0)).toEqual(false);

        expect(isPowerOf2(0.5)).toEqual(false);

        expect(isPowerOf2(-4)).toEqual(false);

        expect(isPowerOf2(16)).toEqual(true);

        expect(isPowerOf2(1024)).toEqual(true);

        expect(isPowerOf2(576)).toEqual(false);

        expect(isPowerOf2(331)).toEqual(false);


    })

})