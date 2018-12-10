import Mat4, { IMat4 } from "../matrix/mat4";
import Quat, { IQuat } from "../matrix/quat";
import Vec3, { IVec3 } from "../matrix/vec3";
import { IDirection, IPosition } from "../types/raw";

let NODE_ID: number = 1;

class Node {

    public id: number = NODE_ID++;

    public position: IPosition = { x: 0, y: 0, z: 0 };
    public rotation: IDirection = { x: 0, y: 0, z: 0 };
    public scale: IDirection = { x: 1, y: 1, z: 1 };

    public parent: Node = null;

    private positionValues: IVec3 = Vec3.create();
    private quatValues: IQuat = Quat.create();
    private scaleValues: IVec3 = Vec3.create();
    private matrixValues: IMat4 = Mat4.create();
    private worldMatrixValues: IMat4 = Mat4.create();

    public getMatrix(): IMat4 {

        Vec3.set(this.positionValues, this.position.x, this.position.y, this.position.z);
        Quat.fromEuler(this.quatValues, this.rotation.x, this.rotation.y, this.rotation.z);
        Vec3.set(this.scaleValues, this.scale.x, this.scale.y, this.scale.z);

        Mat4.fromRotationTranslationScale(this.matrixValues, this.quatValues, this.positionValues, this.scaleValues);

        return this.matrixValues;
    }

    public getWorldMatrix(): IMat4 {

        this.getMatrix();

        if (this.parent) {
            Mat4.multiply(this.worldMatrixValues, this.parent.getWorldMatrix(), this.matrixValues);
        } else {
            Mat4.copy(this.worldMatrixValues, this.matrixValues);
        }

        return this.worldMatrixValues;
    }

}

export default Node;
