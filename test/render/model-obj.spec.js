import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';

function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.beta = 45;
    camera.radius = 4;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 1, z: 1 };
    light1.intensity = 1.5;

    const light3 = new G3D.AmbientLight(scene);
    light3.intensity = 0.2;

    loader.loadTextQueue(
        [
            'https://g.alicdn.com/gama/assets/0.0.3/assets/models/cola/cola.obj',
            'https://g.alicdn.com/gama/assets/0.0.3/assets/models/cola/cola.mtl'
        ],
        function ([obj, mtl]) {

            const k1 = '//img.alicdn.com/tfs/TB1AquIiC_I8KJjy0FoXXaFnVXa-512-512.jpg';
            const k2 = '//img.alicdn.com/tfs/TB1AquIiC_I8KJjy0FoXXaFnVXa-512-512.jpg';

            loader.loadImageQueue(['https:' + k1, 'https:' + k2], function ([image1, image2]) {
                const images = {
                    [k1]: image1,
                    [k2]: image2
                };
                const mesh = G3D.MeshBuilder.createFromObjModel(scene, { obj, mtl, images });

                const app = {
                    default: () => {
                        scene.render();
                    }
                }

                callback(app);

            })
        }
    );
}

const imageUrls = {
    default: '//gw.alicdn.com/tfs/TB1rYSEyyLaK1RjSZFxXXamPFXa-128-128.png',
};

describe('parse obj model', function () {

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