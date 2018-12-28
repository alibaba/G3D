import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';

function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 0;
    camera.beta = 0;
    camera.radius = 5;

    const mesh = G3D.MeshBuilder.createPlane(scene, 2, 2);
    mesh.materials.default = new G3D.RawMaterial();

    loader.loadImage(
        '//gw.alicdn.com/tfs/TB1TfostQvoK1RjSZFNXXcxMVXa-256-256.png',
        function (image) {

            const texture = new G3D.Texture({ image });

            const res = {

                color: () => {
                    mesh.materials.default.color = { r: 220, g: 120, b: 180 };
                    mesh.materials.default.texture = null;
                    scene.render();
                },

                texture: () => {
                    mesh.materials.default.color = { r: 255, g: 255, b: 255 };
                    mesh.materials.default.texture = texture;
                    scene.render();
                },

                colorAndTexture: () => {
                    mesh.materials.default.color = { r: 200, g: 100, b: 30 };
                    mesh.materials.default.texture = texture;
                    scene.render();
                }
            }
            callback(res);
        }
    );
}

const imageUrls = {
    color: '//gw.alicdn.com/tfs/TB1uiZ8xXzqK1RjSZFCXXbbxVXa-128-128.png',
    texture: '//gw.alicdn.com/tfs/TB1FXo7xXzqK1RjSZFoXXbfcXXa-128-128.png',
    colorAndTexture: '//gw.alicdn.com/tfs/TB13ysZxgTqK1RjSZPhXXXfOFXa-128-128.png'
};

describe('raw material', function () {

    let images;
    let app;
    let canvas;

    before(function(done) {
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

    it('color', function () {
        app.color();
        expect(canvas).toRenderAs(images.color);
    });


    it('texture', function () {
        app.texture();
        expect(canvas).toRenderAs(images.texture);
    });

    it('colorAndTexture', function () {
        app.colorAndTexture();
        expect(canvas).toRenderAs(images.colorAndTexture);
    });

});