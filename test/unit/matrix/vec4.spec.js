import expect from '../../helpers/expect';

import Vec4 from '../../../src/matrix/vec4';

describe('Vec4', function () {

    it('#create', function () {
        expect(Vec4.create()).toEqualArray([
            0, 0, 0, 0
        ])
    });

    it('#fromValues', function () {
        expect(Vec4.fromValues(1, 2, 3, 4)).toEqualArray([1, 2, 3, 4]);
    });

    it('#set', function () {
        expect(Vec4.set(Vec4.create(), 1, 2, 3, 4)).toEqualArray([1, 2, 3, 4]);
    });

    it('#copy', function () {
        expect(Vec4.copy(Vec4.create(), Vec4.fromValues(1, 2, 3, 4))).toEqualArray([1, 2, 3, 4]);
    });

});