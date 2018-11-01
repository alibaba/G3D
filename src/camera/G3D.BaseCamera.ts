import Node from '../core/G3D.Node';

import Mat4, { IMat4 } from '../matrix/G3D.Mat4';
import Vec3, { IVec3 } from '../matrix/G3D.Vec3';
import { IPosition, IDirection } from '../types/raw';



class BaseCamera extends Node {

    center: IPosition = { x: 0, y: 0, z: 0 };

    up: IDirection = { x: 0, y: 1, z: 0 };

    private cameraPositionValues: IVec3 = Vec3.create();
    private centerValues: IVec3 = Vec3.create();
    private upValues: IVec3 = Vec3.create();
    private viewMatrixValues: IMat4 = Mat4.create();

    getVMatrix(): IMat4 {
        Vec3.set(this.cameraPositionValues, this.position.x, this.position.y, this.position.z);
        Vec3.set(this.centerValues, this.center.x, this.center.y, this.center.z);
        Vec3.set(this.upValues, this.up.x, this.up.y, this.up.z);
        Mat4.lookAt(this.viewMatrixValues, this.cameraPositionValues, this.centerValues, this.upValues);

        return this.viewMatrixValues;
    }

    // TODO: calc position in shader
    getPosition() {
        return [this.position.x, this.position.y, this.position.z];
    }
}

export default BaseCamera;