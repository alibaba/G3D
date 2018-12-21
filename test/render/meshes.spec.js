import G3D from '../helpers/g3d';
import { initCanvas } from '../helpers/init';
import expect from '../helpers/expect';
import loader from '../helpers/loader';

function init(canvas, callback) {

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 0;
    camera.radius = 5;

    let mesh;

    const res = {
        plane: (useTexure = false) => {

            if (mesh) {
                mesh.dispose();
            }
            mesh = G3D.MeshBuilder.createPlane(scene, 3, 2);
            mesh.materials.default = new G3D.RawMaterial();
            mesh.materials.default.color = { r: 220, g: 120, b: 180 };
            mesh.position.z = -1;
            mesh.rotation.x = 30;
            scene.render();
        },

        sphere: () => {
            if (mesh) {
                mesh.dispose();
            }
            mesh = G3D.MeshBuilder.createSphere(scene, 1, 16, 16);
            mesh.materials.default = new G3D.RawMaterial();
            mesh.materials.default.color = { r: 220, g: 120, b: 180 };
            mesh.position.z = -1;
            scene.render();
        },

        cube: () => {

            if (mesh) {
                mesh.dispose();
            }
            mesh = G3D.MeshBuilder.createCube(scene, 1.8);
            mesh.materials.default = new G3D.RawMaterial();
            mesh.materials.default.color = { r: 220, g: 120, b: 180 };
            mesh.position.z = -1;
            scene.render();

        },

        cylinder: () => {

            if (mesh) {
                mesh.dispose();
            }
            mesh = G3D.MeshBuilder.createCylinder(scene, 1, 1.8, 16);
            mesh.materials.default = new G3D.RawMaterial();
            mesh.materials.default.color = { r: 220, g: 120, b: 180 };
            mesh.position.z = -1;
            scene.render();

        },

        cone: () => {

            if (mesh) {
                mesh.dispose();
            }
            mesh = G3D.MeshBuilder.createCone(scene, 1, 1.8, 16);
            mesh.materials.default = new G3D.RawMaterial();
            mesh.materials.default.color = { r: 220, g: 120, b: 180 };
            mesh.position.z = -1;
            scene.render();

        }

    }

    callback(res);
}

const imageUrls = {
    plane: '//gw.alicdn.com/tfs/TB1AUG8xkvoK1RjSZFwXXciCFXa-128-128.png',
    sphere: '//gw.alicdn.com/tfs/TB1YD_XxkvoK1RjSZFwXXciCFXa-128-128.png',
    cone: '//gw.alicdn.com/tfs/TB12qkgxmzqK1RjSZFpXXakSXXa-128-128.png',
    cube: '//gw.alicdn.com/tfs/TB1xCkFxiLaK1RjSZFxXXamPFXa-128-128.png',
    cylinder: '//gw.alicdn.com/tfs/TB1dM.fxXzqK1RjSZSgXXcpAVXa-128-128.png'
};

describe('meshes', function () {

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

    it('plane', function () {
        app.plane();
        expect(canvas).toRenderAs(images.plane);
    });

    it('sphere', function () {
        app.sphere();
        expect(canvas).toRenderAs(images.sphere);
    });

    it('cube', function () {
        app.cube();
        expect(canvas).toRenderAs(images.cube);
    });

    it('cylinder', function () {
        app.cylinder();
        expect(canvas).toRenderAs(images.cylinder);
    });

    it('cone', function () {
        app.cone();
        expect(canvas).toRenderAs(images.cone);
    });

});