import Geometry from '../geometry/G3D.Geometry';
import CubeTexture from '../texture/G3D.CubeTexture';

class Skybox {

    geometry: Geometry;

    cubeTexture: CubeTexture;

    constructor(scene, images, size = 100) {

        scene.skybox = this;

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

            // bottom face
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

        this.geometry = new Geometry({
            vertices,
            indices: {
                default: indices
            },
            facing: Geometry.FACING.BACK
        });

        this.cubeTexture = new CubeTexture({
            images: {
                front: images.front,
                back: images.back,
                left: images.left,
                right: images.right,
                top: images.top,
                bottom: images.bottom
            }
        });
    }
}

export default Skybox;