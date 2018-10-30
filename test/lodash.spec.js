import expect from 'expect';

import { findIndex } from '../src/utils/lodash';

describe('lodash', function () {

    it('findIndex', function () {

        expect(
            findIndex([{ id: 1, foo: 'foo' }, { id: 2, bar: 'bar' }], { id: 1 })
        ).toEqual(0);

        expect(
            findIndex([1, 2, 3], v => v === 2)
        ).toEqual(1);
    })

});