import Mesh from '../mesh/G3D.Mesh';
import Geometry from '../geometry/G3D.Geometry';
import CubeTexture from '../texture/G3D.CubeTexture';
import Scene from './G3D.Scene';

class Skybox {

    scene: Scene;
    skyboxSize: number;

    cubeMapMesh: Mesh;
    cubeMapTexture: CubeTexture;

    constructor(scene, faceImages, size = 100) {

        scene.skybox = this;

        this.scene = scene;
        this.skyboxSize = size;

        const vertices = [
            // front face
            -size, size, size,
            -size, -size, size,
            size, -size, size,
            size, size, size,

            // back face
            size, size, -size,
            size, -size, -size,
            -size, -size, -size,
            -size, size, -size,

            // left face
            -size, size, -size,
            -size, -size, -size,
            -size, -size, size,
            -size, size, size,

            // right face
            size, size, size,
            size, -size, size,
            size, -size, -size,
            size, size, -size,

            // top face
            -size, size, -size,
            -size, size, size,
            size, size, size,
            size, size, -size,

            //bottom face
            -size, -size, size,
            -size, -size, -size,
            size, -size, -size,
            size, -size, size,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ];

        const mesh = new Mesh({meshes: []});
        mesh.geometry = new Geometry({
            vertices,
            indices: {
                default: indices
            },
            facing: Geometry.FACING.BACK
        });

        this.cubeMapMesh = mesh;

        this.cubeMapTexture = new CubeTexture({
            images: {
                front: faceImages.front,
                back: faceImages.back,
                left: faceImages.left,
                right: faceImages.right,
                top: faceImages.top,
                bottom: faceImages.bottom
            }
        });
    }
}

export default Skybox;