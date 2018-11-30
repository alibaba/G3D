import Node from '../core/node';
import { findIndex } from '../utils/lodash';
import Scene from '../scene/scene';

class BaseMesh extends Node {

    scene: Scene;
    visibility: boolean = true;
    pickable: boolean = true;
    renderLayerIndex: number = 0;

    constructor(scene: Scene) {
        super();
        if (scene) {
            scene.meshes.push(this);
            this.scene = scene;
        }
    }

    getGlobalVisibility(): boolean {
        let mesh = this as Node;
        while (!!mesh) {
            if (mesh instanceof BaseMesh) {
                if (!mesh.visibility) {
                    return false;
                }
            }
            mesh = mesh.parent;
        }
        return true;
    }

    getPickable(): boolean {
        return this.pickable;
    }

    getRenderLayerIndex(): number {
        let mesh = this as Node;
        while (!!mesh) {
            if (mesh instanceof BaseMesh) {
                if (mesh.renderLayerIndex !== 0) {
                    return mesh.renderLayerIndex;
                }
            }
            mesh = mesh.parent;
        }
        return 0;
    }

    dispose(): void {
        if (this.scene) {
            const i = findIndex(this.scene.meshes, { id: this.id });
            if (i !== -1) {
                this.scene.meshes.splice(i, 1);
            }
        }
    }

}

export default BaseMesh;