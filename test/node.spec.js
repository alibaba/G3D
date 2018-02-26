import expect from 'expect';

describe('node', function () {

    it('transform coodinates', function () {

        const node = new Node();

        const q1 = node.transformCoordinate(0, 0, 1);
        expect(q1).toEqual({ x: 0, y: 0, z: 1 });

        node.position.y = 2;
        const q2 = node.transformCoordinate(1.5, 0, 1);
        expect(q2).toEqual({ x: 1.5, y: 2, z: 1 });

        node.rotation.x = 90;
        const q3 = node.transformCoordinate(0, 0, 1);
        expect(q3.x).toEqual(0);
        expect(q3.y).toEqual(1);
        expect(Math.abs(q3.z)).toBeLessThan(0.01);
        
    })


    it('transform normals', function () {

        const node = new Node();

        const q1 = node.transformNormal(0, 0, 1);
        expect(q1).toEqual({ x: 0, y: 0, z: 1 });

        node.position.y = 2;
        const q2 = node.transformNormal(1.5, 0, 1);
        expect(q2).toEqual({ x: 1.5, y: 0, z: 1 });

        node.rotation.x = 90;
        const q3 = node.transformNormal(0, 0, 1);
        expect(q3.x).toEqual(0);
        expect(Math.abs(q3.y+1)).toBeLessThan(0.01);
        expect(Math.abs(q3.z)).toBeLessThan(0.01);
    })

});