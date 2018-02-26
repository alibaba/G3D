import expect from 'expect';

describe('Ray', function () {


    it('distance to plane', function () {

        const ray = new Ray();

        ray.origin.x = 1;
        ray.origin.y = 1;
        ray.origin.z = 1;
        ray.direction.x = -1;
        ray.direction.y = -1;
        ray.direction.z = -1;

        const dist = ray.distanceToPlane({
            normal: { x: 1, y: 1, z: 1 },
            offset: -1
        });

        expect(Math.abs(dist - Math.sqrt(3) - 1)).toBeLessThan(0.001);
    })

    it('intersect plane', function () {
        const ray = new Ray();

        ray.origin.x = 1;
        ray.origin.y = 1;
        ray.origin.z = 1;
        ray.direction.x = -1;
        ray.direction.y = -1;
        ray.direction.z = 0;

        const pt = ray.intersectPlane({
            normal: { x: 1, y: 1, z: 1 },
            offset: 0
        });

        expect(pt.x).toEqual(-0.5);
        expect(pt.y).toEqual(-0.5);
        expect(pt.z).toEqual(1);
    })

    it('camera view ray', function () {

        const c = new PerspectiveCamera({ engine: { width: 100, height: 100 } });
        c.fov = 45;
        c.near = 1;
        c.far = 1000;

        c.position.x = 1;
        c.position.y = 1;
        c.position.z = 1;

        c.center.x = 0;
        c.center.y = 0;
        c.center.z = 0;

        const res = c.getViewRay(50, 50);

        expect(res.x).toEqual(res.y);
        expect(res.x).toEqual(res.z);
    })

});