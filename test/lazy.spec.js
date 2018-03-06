import expect from 'expect';

@Lazy(['foo', 'bar', 'bar.x', 'bar.foo', 'bar.foo.y'], [], 'flag')
class Foo {
    foo = 1;
    bar = {
        x: 1,
        y: 2,
        z: 3,
        foo: {
            x: 1,
            y: 2
        }
    }

    constructor() {
        console.log('constructor');
    }
}


describe.only('Lazy', function () {

    it('should works ok', function () {

        const f = new Foo();
        expect(f.flag).toBe(true);
        f.flag = false;
        expect(f.flag).toBe(false);

        f.foo = 2;
        expect(f.flag).toBe(true);
        f.flag = false;
        expect(f.flag).toBe(false);

        f.bar.x = 2;
        expect(f.flag).toBe(true);
        f.flag = false;
        expect(f.flag).toBe(false);

        f.bar.y = 4;
        expect(f.flag).toBe(false);

        f.bar = {
            x: 1,
            y: 3,
            foo: {
                y: 3
            }
        };
        expect(f.flag).toBe(true);
        f.flag = false;
        expect(f.flag).toBe(false);

        f.bar.x = 2;
        expect(f.flag).toBe(true);
        f.flag = false;
        expect(f.flag).toBe(false);

        f.bar.foo = {
            x: 1,
            y: 3
        }
        expect(f.flag).toBe(true);
        f.flag = false;
        expect(f.flag).toBe(false);

        f.bar.foo.y = 3;
        expect(f.flag).toBe(true);
        // f.flag = false;
        // expect(f.flag).toBe(false);

    })

})