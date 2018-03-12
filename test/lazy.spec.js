import expect from 'expect';

describe('Lazy', function () {


    @Lazy(['a', 'c', 'c.a', 'c.c', 'c.c.a'], ['getA1', 'getA2', 'getA3'], 'flag')
    class Foo {
        a = 1;
        b = 1;
        c = {
            a: 1,
            b: 1,
            c: {
                a: 1,
                b: 1,
            }
        }

        getA3Count = 0;

        constructor() {
        }

        getA1() {
            return this.a;
        }

        getA2() {
            return this.a + this.c.a;
        }

        getA3() {
            this.getA3Count++;
            return this.a + this.c.a + this.c.c.a;
        }
    }


    it('should works source', function () {

        const f = new Foo();

        const shouldActive = yes => {
            if (yes) {
                expect(f.flag).toBe(true);
                f.flag = false;
                expect(f.flag).toBe(false);
            } else {
                expect(f.flag).toBe(false);
            }
        }

        shouldActive(true);

        f.a = 2;
        shouldActive(true);
        expect(f.a).toBe(2);

        f.b = 2;
        shouldActive(false);
        expect(f.b).toBe(2);

        f.c = {
            a: 2,
            b: 2,
            c: {
                a: 2,
                b: 2
            }
        }
        shouldActive(true);
        expect(f.a).toEqual(2);
        expect(f.b).toEqual(2);
        expect(f.c.a).toEqual(2);
        expect(f.c.b).toEqual(2);

        f.c.a = 3;
        shouldActive(true);
        expect(f.c.a).toEqual(3);

        f.c.b = 3;
        shouldActive(false);
        expect(f.c.b).toEqual(3);

        f.c.c = {
            a: 3,
            b: 3
        }
        shouldActive(true);
        expect(f.c.c.a).toEqual(3);
        expect(f.c.c.b).toEqual(3);

        f.c.c.a = 4;
        shouldActive(true);
        expect(f.c.c.a).toEqual(4);

        f.c.c.b = 4;
        shouldActive(false);
        expect(f.c.c.b).toEqual(4);

    })




    it('should works dist', function () {

        const f = new Foo();

        const shouldGet = (a1, a2, a3) => {
            expect(f.getA1()).toBe(a1);
            expect(f.getA2()).toBe(a2);
            expect(f.getA3()).toBe(a3);
        }

        shouldGet(1, 2, 3);
        expect(f.flag).toBe(false);
        expect(f.getA3Count).toBe(1);

        f.a = 2;
        f.c = {
            a: 3,
            b: 1,
            c: {
                a: 1,
                b: 1
            }
        };
        f.c.c.a = 7;
        shouldGet(2, 5, 12);
        expect(f.getA3Count).toBe(2);
        expect(f.flag).toBe(false);
        shouldGet(2, 5, 12);
        expect(f.getA3Count).toBe(2);

    })
})