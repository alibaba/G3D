@Lazy(
    ['image'],
    ['getTexture']
)
class Texture {

    offset = { x: 0, y: 0 };
    image = new Uint8Array([255, 255, 255, 255]);

    material = null;

    constructor(material) {
        this.material = material;
    }

    getImage() {
        return this.image;
    }

    getTexture() {
        const engine = this.material.mesh.scene.engine;
        return engine.createTexture(this.getImage());
    }
}

export default Texture;