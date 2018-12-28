import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';


function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.center = { x: 0.2, y: 0.5, z: 0 };
    camera.alpha = 15;
    camera.beta = 25;
    camera.radius = 2;
    camera.near = 0.001;
    camera.far = 5;

    const light = new G3D.DirectionalLight(scene);
    light.direction = { x: 0, y: 0, z: 10 };
    light.intensity = 0.3;
    light.castShadow = true;

    const m = G3D.MeshBuilder.createPlane(scene, 3, 2);
    m.position.z = -2;

    const m1 = G3D.MeshBuilder.createCone(scene, 0.3, 0.5);
    m1.position.x = -1;
    const m2 = G3D.MeshBuilder.createCube(scene, 0.5);
    const m3 = G3D.MeshBuilder.createCylinder(scene, 0.2, 0.5);
    m3.position.x = 1;

    const app = {
        default: () => {
            m1.rotation = { x: 0, y: 0, z: 0 };
            m2.rotation = { x: 0, y: 0, z: 0 };
            m3.rotation = { x: 0, y: 0, z: 0 };
            scene.render();
        },

        rotate: () => {
            m1.rotation = { x: 100, y: 70, z: 0 };
            m2.rotation = { x: 100, y: 70, z: 0 };
            m3.rotation = { x: 100, y: 70, z: 0 };
            scene.render();
        }
    }

    callback(app);
}

const imageUrls = {
    default: '//gw.alicdn.com/tfs/TB1Go1eyNnaK1RjSZFBXXcW7VXa-128-128.png',
    rotate: '//gw.alicdn.com/tfs/TB1iPF0yIfpK1RjSZFOXXa6nFXa-128-128.png'
};

describe('clear color', function () {

    let images;
    let app;
    let canvas;

    before(function (done) {
        this.timeout(30000);
        loader.loadImageQueue(imageUrls, result => {
            images = result;
            canvas = initCanvas(128, 128);
            init(canvas, function (m) {
                app = m;
                done();
            });
        })
    })

    it('default', function () {
        app.default();
        expect(canvas).toRenderAs(images.default);
    });

    it('rotate', function () {
        app.rotate();
        expect(canvas).toRenderAs(images.rotate);
    });

});