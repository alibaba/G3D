

class Mesh extends Node {

    geometry = new Geometry(this);
    materials = {
        default: new StandardMaterial(this)
    };
    scene = null;

    visibility = true;
    pickable = true;
    renderLayerIndex = 0;

    constructor(scene) {
        super();
        this.scene = scene;
        this.scene.meshes.push(this);
    }

    dispose() {
        const i = _.findIndex(this.scene.meshes, { id: this.id });
        if (i !== -1) {
            this.scene.meshes.splice(i, 1);
        }
    }

    getGlobalVisibility() {
        let mesh = this;
        while (mesh !== null) {
            if (!mesh.visibility) {
                return false;
            }
            mesh = mesh.parent;
        }
        return true;
    }

    getPickable() {
        return this.pickable;
    }

    getRenderLayerIndex() {
        let mesh = this;
        while (mesh !== null) {
            if (mesh.renderLayerIndex !== 0) {
                return mesh.renderLayerIndex;
            }
            mesh = mesh.parent;
        }
        return 0;
    }
}

export default Mesh;