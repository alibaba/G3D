import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';

function render(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 0;
    camera.radius = 8;

    scene.render();

    callback();
}

const result = '//gw.alicdn.com/tfs/TB1jNl1xiLaK1RjSZFxXXamPFXa-128-128.png';

describe('clear color', function () {

    let image;

    before(done => {
        loader.loadImage(result, img => {
            image = img;
            done();
        })
    })

    it('ok', function () {

        const canvas = initCanvas(128, 128);
        render(canvas, function () {
            expect(canvas).toRenderAs(image);
        });
    });

});