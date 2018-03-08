let Node_ID = 1;

@Lazy(
    [
        'position', 'position.x', 'position.y', 'position.z',
        'rotation', 'rotation.x', 'rotation.y', 'rotation.z',
        'scale', 'scale.x', 'scale.y', 'scale.z'
    ],
    [
        'getMatrix'
    ]
)
class Node {

    id = Node_ID++;
    position = { x: 0, y: 0, z: 0 };
    rotation = { x: 0, y: 0, z: 0 };
    scale = { x: 1, y: 1, z: 1 };
    parent = null;

    constructor() {

    }

    getWorldMatrix() {
        if (this.parent) {
            const parentMatrix = this.parent.getWorldMatrix();
            return Mat4.multiply(Mat4.create(), parentMatrix, this.getMatrix());
        } else {
            return this.getMatrix();
        }
    }


    getMatrix() {
        const quat = Quat.create();
        Quat.fromEuler(quat, this.rotation.x, this.rotation.y, this.rotation.z);
        const position = Vec3.fromValues(this.position.x, this.position.y, this.position.z);
        const scale = Vec3.fromValues(this.scale.x, this.scale.y, this.scale.z);
        const mat = Mat4.create();
        Mat4.fromRotationTranslationScale(mat, quat, position, scale);
        return mat;
    }

    transformCoordinate(x, y, z) {

        const mat = this.getMatrix();
        const vec = Vec3.fromValues(x, y, z);

        const res = Vec3.transformMat4(Vec3.create(), vec, mat);

        return { x: res[0], y: res[1], z: res[2] };
    }

    transformNormal(x, y, z) {

        const mat = this.getMatrix();
        const vec = Vec4.fromValues(x, y, z, 0);

        const res = Vec4.transformMat4(Vec4.create(), vec, mat);

        return { x: res[0], y: res[1], z: res[2] };
    }

}

export default Node;