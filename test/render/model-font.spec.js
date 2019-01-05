import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';

function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 3000;
    camera.far = 8000;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 1, z: 1 };
    light1.intensity = 0.6;

    const light2 = new G3D.AmbientLight(scene);
    light2.intensity = 0.3;

    loader.loadText(
        'http://g.alicdn.com/gama/assets/0.0.6/assets/fonts-json/optimer.json',
        function (text) {

            const font = JSON.parse(text);

            createMesh('H', -1000, 0, 0);
            createMesh('8', 500, 0, 300);

            function createMesh(char, x, y, z) {
                const path = font.glyphs[char].o;
                const mesh = G3D.MeshBuilder.createMeshFromPath(scene, path, 100, 20);

                mesh.position.x = x;
                mesh.position.y = y;
                mesh.position.z = z;
            }

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
    default: '//gw.alicdn.com/tfs/TB1tjTEywTqK1RjSZPhXXXfOFXa-128-128.png'
};

describe('parse font model', function () {

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
});