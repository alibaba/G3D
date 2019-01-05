import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';

function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 20;
    camera.beta = 20;

    const coordinate = G3D.MeshBuilder.createCoordinate(scene, 40);

    const app = {
        default: () => {
            scene.render();
        }
    }

    callback(app);
}

const imageUrls = {
    default: '//gw.alicdn.com/tfs/TB15pe5AXzqK1RjSZFCXXbbxVXa-128-128.png'
};

describe('coordinate', function () {

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