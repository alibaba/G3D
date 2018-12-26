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

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 1, z: 1 };
    light1.intensity = 0.4;

    const light2 = new G3D.PointLight(scene);
    light2.position = { x: -2, y: 2, z: 2 };
    light2.intensity = 0.4;

    const light3 = new G3D.AmbientLight(scene);
    light3.intensity = 0.2;

    const mesh = G3D.MeshBuilder.createSphere(scene, 1, 64, 64);
    mesh.position.z = -1;
    const mtl = mesh.materials.default = new G3D.PhongMaterial();

    loader.loadImage(
        '//gw.alicdn.com/tfs/TB1TfostQvoK1RjSZFNXXcxMVXa-256-256.png',
        function (image) {

            const texture = new G3D.Texture({ image });

            const res = {

                default: () => {
                    scene.render();
                },

                dark: () => {
                    light1.intensity = 0.0;
                    light2.intensity = 0.0;
                    light3.intensity = 0.0;
                    scene.render();
                },

                ambient: () => {
                    light1.intensity = 0.0;
                    light2.intensity = 0.0;
                    light3.intensity = 1.0;
                    mtl.ambientColor = { r: 200, g: 100, b: 80 };
                    mtl.ambientTexture = null;
                    scene.render();
                },

                ambientTexture: () => {
                    light1.intensity = 0.0;
                    light2.intensity = 0.0;
                    light3.intensity = 1.0;
                    mtl.ambientColor = { r: 100, g: 120, b: 220 };
                    mtl.ambientTexture = texture;
                    scene.render();
                },

                diffuse: () => {
                    light1.intensity = 0.5;
                    light2.intensity = 0.5;
                    light3.intensity = 0;
                    mtl.diffuseColor = { r: 200, g: 100, b: 80 };
                    mtl.diffuseTexture = null;
                    mtl.specularColor = { r: 0, g: 0, b: 0 };
                    mtl.specularTexture = null;
                    scene.render();
                },

                diffuseTexture: () => {
                    light1.intensity = 0.5;
                    light2.intensity = 0.5;
                    light3.intensity = 0;
                    mtl.diffuseColor = { r: 200, g: 100, b: 80 };
                    mtl.diffuseTexture = texture;
                    mtl.specularColor = { r: 0, g: 0, b: 0 };
                    mtl.specularTexture = null;
                    scene.render();
                },

                specular: () => {
                    light1.intensity = 4;
                    light2.intensity = 4;
                    light3.intensity = 0;
                    mtl.diffuseColor = { r: 0, g: 0, b: 0 };
                    mtl.diffuseTexture = null;
                    mtl.specularColor = { r: 255, g: 255, b: 255 };
                    mtl.specularTexture = null;
                    mtl.glossiness = 1.0;
                    scene.render();
                },

                specularTexture: () => {
                    light1.intensity = 4;
                    light2.intensity = 4;
                    light3.intensity = 0;
                    mtl.diffuseColor = { r: 0, g: 0, b: 0 };
                    mtl.diffuseTexture = null;
                    mtl.specularColor = { r: 200, g: 100, b: 80 };
                    mtl.specularTexture = texture;
                    mtl.glossiness = 1.0;
                    scene.render();
                }
            }


            callback(res);
        }
    );
}

const imageUrls = {
    default: 'https://gw.alicdn.com/tfs/TB1VwVnypYqK1RjSZLeXXbXppXa-128-128.png',
    dark: 'https://gw.alicdn.com/tfs/TB1o3tqyrvpK1RjSZFqXXcXUVXa-128-128.png',
    ambient: 'https://gw.alicdn.com/tfs/TB1aBdpyrvpK1RjSZPiXXbmwXXa-128-128.png',
    ambientTexture: 'https://gw.alicdn.com/tfs/TB18vxNyxjaK1RjSZKzXXXVwXXa-128-128.png',
    diffuse: 'https://gw.alicdn.com/tfs/TB18UNuysfpK1RjSZFOXXa6nFXa-128-128.png',
    diffuseTexture: 'https://gw.alicdn.com/tfs/TB13ihkyCzqK1RjSZFLXXcn2XXa-128-128.png',
    specular: 'https://gw.alicdn.com/tfs/TB1_3JoysbpK1RjSZFyXXX_qFXa-128-128.png',
    specularTexture: 'https://gw.alicdn.com/tfs/TB1GfhoyyrpK1RjSZFhXXXSdXXa-128-128.png',
};

describe('phong material', function () {

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

    it('dark', function () {
        app.dark();
        expect(canvas).toRenderAs(images.dark);
    });

    it('ambient', function () {
        app.ambient();
        expect(canvas).toRenderAs(images.ambient);
    });


    it('ambientTexture', function () {
        app.ambientTexture();
        expect(canvas).toRenderAs(images.ambientTexture);
    });


    it('diffuse', function () {
        app.diffuse();
        expect(canvas).toRenderAs(images.diffuse);
    });


    it('diffuseTexture', function () {
        app.diffuseTexture();
        expect(canvas).toRenderAs(images.diffuseTexture);
    });


    it('specular', function () {
        app.specular();
        expect(canvas).toRenderAs(images.specular);
    });

    it('specularTexture', function () {
        app.specularTexture();
        expect(canvas).toRenderAs(images.specularTexture);
    });

});