import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';

function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    new G3D.RotatePerspectiveCamera(scene);

    const res = {
        default: () => {
            scene.render();
        },

        custom: () => {
            scene.clearColor = { r: 100, g: 120, b: 80 };
            scene.render();
        }
    }

    callback(res);
}

const imageUrls = {
    default: '//gw.alicdn.com/tfs/TB1jNl1xiLaK1RjSZFxXXamPFXa-128-128.png',
    custom: '//gw.alicdn.com/tfs/TB1xNKWxkPoK1RjSZKbXXX1IXXa-128-128.png'
};

describe('clear color', function () {

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

    it('default background color', function () {
        app.default();
        expect(canvas).toRenderAs(images.default);
    });

    it('custom background color', function () {
        app.custom();
        expect(canvas).toRenderAs(images.custom);
    });

});