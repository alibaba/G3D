import Node from "../core/node";
import Scene from "../scene/scene";
import { findIndex } from "../utils/lodash";

class BaseMesh extends Node {

    public scene: Scene;
    public visibility: boolean = true;
    public pickable: boolean = true;
    public renderLayerIndex: number = 0;

    constructor(scene: Scene) {
        super();
        if (scene) {
            scene.meshes.push(this);
            this.scene = scene;
        }
    }

    public getGlobalVisibility(): boolean {
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

    public getPickable(): boolean {
        return this.pickable;
    }

    public getRenderLayerIndex(): number {
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

    public dispose(): void {
        if (this.scene) {
            const i = findIndex(this.scene.meshes, { id: this.id });
            if (i !== -1) {
                this.scene.meshes.splice(i, 1);
            }
        }
    }

}

export default BaseMesh;
