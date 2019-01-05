import expect from '../../helpers/expect';

import Vec2 from '../../../src/matrix/vec2';

describe('Vec2', function () {

    it('#create', function () {
        expect(Vec2.create()).toEqualArray([
            0, 0
        ])
    });

    it('#fromValues', function () {
        expect(Vec2.fromValues(1, 2)).toEqualArray([1, 2]);
    });

    it('#set', function () {
        expect(Vec2.set(Vec2.create(), 1, 2)).toEqualArray([1, 2]);
    });

    it('#copy', function () {
        expect(Vec2.copy(Vec2.create(), Vec2.fromValues(1, 2))).toEqualArray([1, 2]);
    });

});