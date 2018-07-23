@Lazy(
    ['image', 'sRGB', 'flipY'],
    ['getTexture']
)
class Texture {

    width = 1;
    height = 1;
    image = new Uint8Array([255, 255, 255, 255]);

    sRGB = false;
    
    flipY = true;

    clamp = false; // or repeat

    constructor() {
    }

    getTexture() {
        
        const engine = Engine.instance;

        const [width, height] = this.image.width ? [this.image.width, this.image.height] : [this.width, this.height];
        
        return engine.createTexture(this.image, width, height, this.sRGB, this.flipY, this.clamp);
    }
}

export default Texture;