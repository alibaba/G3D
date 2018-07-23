class PBREnviroment {

    diffuse = new CubeTexture();

    specular = new CubeTexture();

    brdfLUT = new Texture();

    constructor() {

        this.brdfLUT.flipY = false;

        this.brdfLUT.clamp = true;

        // const image = new Env.Image();
        // image.crossOrigin = true;
        // image.src = 'https://img.alicdn.com/tfs/TB1yCjuoDtYBeNjy1XdXXXXyVXa-256-256.png';
        // image.onload = () => {
        //     this.brdfLUT.image = image;
        // }

    }

}

export default PBREnviroment;