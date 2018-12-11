import expect from '../helpers/expect';

import { findIndex, find } from '../../src/utils/lodash';

describe('utils/lodash', function () {

    it('findIndex should work', function () {

        expect(
            findIndex([{ id: 1, foo: 'foo' }, { id: 2, bar: 'bar' }], { id: 1 })
        ).toEqual(0);

        expect(
            findIndex([{ id: 1, foo: 'foo' }, { id: 2, bar: 'bar' }], { id: 3 })
        ).toEqual(-1);

        expect(
            findIndex([1, 2, 3], v => v === 2)
        ).toEqual(1);

    })

    it('find should work', function(){

        expect(
            find([{ id: 1, foo: 'foo' }, { id: 2, bar: 'bar' }], { id: 1 })
        ).toEqual({id: 1, foo: 'foo'});

        expect(
            find([{ id: 1, foo: 'foo' }, { id: 2, bar: 'bar' }], { id: 3 })
        ).toEqual(null);

        expect(
            find([1, 2, 3], v => v === 2)
        ).toEqual(2);

    })

});