import expect from 'expect';

describe('lodash', function () {

    it('findIndex', function () {

        expect(
            _.findIndex([{ id: 1, foo: 'foo' }, { id: 2, bar: 'bar' }], { id: 1 })
        ).toEqual(0);

        expect(
            _.findIndex([1, 2, 3], v => v === 2)
        ).toEqual(1);
    })

})