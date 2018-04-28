@Lazy(
    ['images', 'images.top', 'images.bottom', 'images.left', 'images.right', 'images.front', 'images.back'],
    ['getTexture']
)
class CubeTexture {

    width = 1;
    height = 1;

    images = {
        top: new Uint8Array([255, 255, 255, 255]),
        bottom: new Uint8Array([255, 255, 255, 255]),
        left: new Uint8Array([255, 255, 255, 255]),
        right: new Uint8Array([255, 255, 255, 255]),
        front: new Uint8Array([255, 255, 255, 255]),
        back: new Uint8Array([255, 255, 255, 255]),
        mip: null
    };

    getTexture() {

        const engine = Engine.instance;

        const { width, height } = this;

        return engine.createCubeTexture(this.images, width, height);
    }
}

export default CubeTexture;