@Lazy(
    ['images', 'images.top', 'images.bottom', 'images.left', 'images.right', 'images.front', 'images.back', 'sRGB', 'flipY'],
    ['getTexture']
)
class CubeTexture {

    width = 1;
    height = 1;

    sRGB = true;
    flipY = false;

    images = {
        top: new Uint8Array([255, 255, 255, 255]),
        bottom: new Uint8Array([255, 255, 255, 255]),
        left: new Uint8Array([255, 255, 255, 255]),
        right: new Uint8Array([255, 255, 255, 255]),
        front: new Uint8Array([255, 255, 255, 255]),
        back: new Uint8Array([255, 255, 255, 255]),
        mip: null
    };

    constructor(images) {
        Object.assign(this.images, images);
    }

    getTexture() {

        const engine = Engine.instance;

        const { width, height } = this;

        return engine.createCubeTexture(this.images, width, height, this.sRGB, this.flipY);
    }

    getMipLevel() {
        if (this.images.mip) {
            return this.images.mip.length;
        } else {
            return 0;
        }
    }
}

export default CubeTexture;