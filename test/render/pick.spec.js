import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';

function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = -60;
    camera.beta = 30;
    camera.radius = 6;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: -1, y: 0, z: 1 };
    light1.intensity = 0.5;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.5;

    const m1 = G3D.MeshBuilder.createPlane(scene, 3, 3);
    m1.position.z = -2;

    const m2 = G3D.MeshBuilder.createSphere(scene, 1.2, 128, 128);
    m2.position.z = 2;

    const m3 = G3D.MeshBuilder.createCube(scene, 1);
    m3.position.x = 2;

    const app = {
        default: () => {
            scene.render();
            return {
                scene,
                meshes: [m1, m2, m3]
            };
        }
    }

    callback(app);
}

const imageUrls = {
    default: '//gw.alicdn.com/tfs/TB1NHpJySzqK1RjSZFjXXblCFXa-128-128.png',
};

describe('pick from scene', function () {

    let canvas;
    let images;
    let meshes;
    let scene;

    before(function (done) {
        this.timeout(30000);
        loader.loadImageQueue(imageUrls, result => {
            images = result;
            canvas = initCanvas(128, 128);
            init(canvas, function (app) {
                const res = app.default();
                scene = res.scene;
                meshes = res.meshes;
                done();
            });
        })
    })

    it('render', function () {
        expect(canvas).toRenderAs(images.default);
    });

    it('pick from background', function () {
        expect(scene.pick(0, 0)).toEqual(0);
        expect(scene.pick(10, 20)).toEqual(0);
    });

    it('pick from mesh_0', function () {
        expect(scene.pick(30, 50)).toEqual(meshes[0].id);
    });

    it('pick from mesh_1', function () {
        expect(scene.pick(100, 80)).toEqual(meshes[1].id);
    });

    it('pick from mesh_2', function () {
        expect(scene.pick(77, 50)).toEqual(meshes[2].id);
    });

});