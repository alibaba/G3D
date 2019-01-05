import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';
import pbrAssets from '../helpers/pbr-assets';

import { isHeadlessMode } from '../helpers/env';

function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 0;
    camera.beta = 0;
    camera.radius = 5;

    const light1 = new G3D.DirectionalLight(scene);
    light1.direction = { x: 1, y: 1, z: 1 };
    light1.intensity = 1;

    const light2 = new G3D.PointLight(scene);
    light2.position = { x: -2, y: 2, z: 2 };
    light2.intensity = 1;

    const mesh = G3D.MeshBuilder.createSphere(scene, 2, 64, 64);
    mesh.position.z = -1;

    pbrAssets((specular, diffuse, brdfLUT) => {

        const pbrEnv = new G3D.PBREnviroment({
            diffuse,
            specular,
            brdfLUT
        });

        const mtl = mesh.materials.default = new G3D.PBRMaterial();

        const app = {

            default: () => {
                scene.render();
            },

            mr_1: () => {
                mtl.pbrEnviroment = null;
                mtl.albedoColor = { r: 100, g: 200, b: 200 };
                mtl.metallic = 0.9;
                mtl.roughness = 0.1;
                scene.render();
            },

            mr_2: () => {
                mtl.pbrEnviroment = null;
                mtl.albedoColor = { r: 100, g: 200, b: 200 };
                mtl.metallic = 0.1;
                mtl.roughness = 0.9;
                scene.render();
            },

            mr_3: () => {
                mtl.pbrEnviroment = null;
                mtl.albedoColor = { r: 100, g: 200, b: 200 };
                mtl.metallic = 0.9;
                mtl.roughness = 0.9;
                scene.render();
            },

            mr_4: () => {
                mtl.pbrEnviroment = null;
                mtl.albedoColor = { r: 100, g: 200, b: 200 };
                mtl.metallic = 0.1;
                mtl.roughness = 0.1;
                scene.render();
            },

            env_mr_1: () => {
                mtl.pbrEnviroment = pbrEnv;
                mtl.albedoColor = { r: 200, g: 200, b: 200 };
                mtl.metallic = 0.9;
                mtl.roughness = 0.1;
                scene.render();
            },

            env_mr_2: () => {
                mtl.pbrEnviroment = pbrEnv;
                mtl.albedoColor = { r: 200, g: 200, b: 200 };
                mtl.metallic = 0.1;
                mtl.roughness = 0.9;
                scene.render();
            },

            env_mr_3: () => {
                mtl.pbrEnviroment = pbrEnv;
                mtl.albedoColor = { r: 200, g: 200, b: 200 };
                mtl.metallic = 0.9;
                mtl.roughness = 0.9;
                scene.render();
            },

            env_mr_4: () => {
                mtl.pbrEnviroment = pbrEnv;
                mtl.albedoColor = { r: 200, g: 200, b: 200 };
                mtl.metallic = 0.1;
                mtl.roughness = 0.1;
                scene.render();
            }
        }

        callback(app);
    });
}

const imageUrls = {
    default: '//gw.alicdn.com/tfs/TB1sptVyxTpK1RjSZFKXXa2wXXa-128-128.png',
    env_mr_1: '//gw.alicdn.com/tfs/TB1YzRWyCzqK1RjSZFHXXb3CpXa-128-128.png',
    env_mr_2: '//gw.alicdn.com/tfs/TB1QP5iyxjaK1RjSZKzXXXVwXXa-128-128.png',
    env_mr_3: '//gw.alicdn.com/tfs/TB1HfVWyAvoK1RjSZPfXXXPKFXa-128-128.png',
    env_mr_4: '//gw.alicdn.com/tfs/TB17Yd.yxjaK1RjSZFAXXbdLFXa-128-128.png',
    mr_1: '//gw.alicdn.com/tfs/TB1hxxUypzqK1RjSZFvXXcB7VXa-128-128.png',
    mr_2: '//gw.alicdn.com/tfs/TB1KEXRyzTpK1RjSZKPXXa3UpXa-128-128.png',
    mr_3: '//gw.alicdn.com/tfs/TB1fw4ZywHqK1RjSZFPXXcwapXa-128-128.png',
    mr_4: '//gw.alicdn.com/tfs/TB1_RJWyq6qK1RjSZFmXXX0PFXa-128-128.png'
};

describe('pbr material', function () {

    let images;
    let app;
    let canvas;

    before(function (done) {
        this.timeout(60 * 1000);
        loader.loadImageQueue(imageUrls, result => {
            images = result;
            canvas = initCanvas(128, 128);
            init(canvas, function (m) {
                app = m;
                done();
            });
        })
    });

    it('default', function () {
        app.default();
        expect(canvas).toRenderAs(images.default);
    });

    it('mr_1', function () {
        app.mr_1();
        expect(canvas).toRenderAs(images.mr_1);
    });

    it('mr_2', function () {
        app.mr_2();
        expect(canvas).toRenderAs(images.mr_2);
    });

    it('mr_3', function () {
        app.mr_3();
        expect(canvas).toRenderAs(images.mr_3);
    });

    it('mr_4', function () {
        app.mr_4();
        expect(canvas).toRenderAs(images.mr_4);
    });

    // HeadlessChrome does support TEX_LOD and SRGB WebGL extensions
    if (!isHeadlessMode) {

        it('env_mr_1', function () {
            app.env_mr_1();
            expect(canvas).toRenderAs(images.env_mr_1);
        });

        it('env_mr_2', function () {
            app.env_mr_2();
            expect(canvas).toRenderAs(images.env_mr_2);
        });

        it('env_mr_3', function () {
            app.env_mr_3();
            expect(canvas).toRenderAs(images.env_mr_3);
        });

        it('env_mr_4', function () {
            app.env_mr_4();
            expect(canvas).toRenderAs(images.env_mr_4);
        });

    }
});