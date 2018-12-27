import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';

function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 0;
    camera.beta = 20;
    camera.radius = 120;
    camera.far = 300;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 1, z: 1 };
    light1.intensity = 0.6;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.3;

    loader.loadText(
        'http://g.alicdn.com/gama/assets/0.0.20/assets/models/stl/venus_print-ascii.txt',
        function (text) {
            const mesh = G3D.MeshBuilder.createFromStlModel(scene, text);
            mesh.rotation.x = 270;
            mesh.rotation.y = 180;
            mesh.position.y = -50;

            const app = {
                default: () => {
                    scene.render();
                }
            }

            callback(app);
        }
    )
}

const imageUrls = {
    default: '//gw.alicdn.com/tfs/TB1eujLyq6qK1RjSZFmXXX0PFXa-128-128.png',
};

describe('parse stl model', function () {

    let images;
    let app;
    let canvas;

    before(done => {
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

});