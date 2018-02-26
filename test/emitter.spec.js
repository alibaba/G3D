import expect from 'expect';

describe('Emitter', function () {

    let count = 0;
    let lastArg = null;
    const listener = (e) => {
        lastArg = e;
        count++;
    }
    const emitter = new Emitter();

    it('should works ok', function () {

        emitter.on('foo', listener);
        emitter.fire('foo', { foo: 1 });

        expect(count).toEqual(1);
        expect(lastArg).toEqual({ foo: 1 });

        emitter.fire('bar', { bar: 1 });

        expect(count).toEqual(1);
        expect(lastArg).toEqual({ foo: 1 });

        emitter.off('foo', listener);
        expect(count).toEqual(1);
        expect(lastArg).toEqual({ foo: 1 });

    })

})