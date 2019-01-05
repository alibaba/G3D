import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';

function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotateOrthographicCamera(scene);
    camera.alpha = 0;
    camera.beta = 45;
    camera.radius = 10;

    const mtl1 = new G3D.RawMaterial();
    mtl1.color = {r: 255, g: 100, b: 100};

    const mtl2 = new G3D.RawMaterial();
    mtl2.color = {r: 100, g: 100, b: 255};

    const m1 = G3D.MeshBuilder.createPlane(scene, 6, 4);
    m1.position.z = -1;
    m1.materials.default = mtl1;

    const m2 = G3D.MeshBuilder.createSphere(scene, 1, 32);
    m2.position.z = 1;
    m2.materials.default = mtl2;

    const app = {
        default: () => {
            scene.render();
        },

        rotate: () => {
            camera.alpha = 20;
            camera.beta = 50;
            scene.render();
        }
    }

    callback(app);
}

const imageUrls = {
    default: '//gw.alicdn.com/tfs/TB16fGcAcfpK1RjSZFOXXa6nFXa-128-128.png',
    rotate: '//gw.alicdn.com/tfs/TB1nlWsAhnaK1RjSZFBXXcW7VXa-128-128.png'
};

describe('OrthoCamera', function () {

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