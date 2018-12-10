import CubeTexture from "../texture/cube-texture";
import Texture from "../texture/texture";

interface IPBREnviromentConfig {
    diffuse: any;
    specular: any;
    brdfLUT: HTMLImageElement;
    sRGB?: boolean;
}

class PBREnviroment {

    public diffuse: CubeTexture;

    public specular: CubeTexture;

    public brdfLUT: Texture;

    public greyness: number = 0;

    constructor({
        diffuse,
        specular,
        brdfLUT,
        sRGB = false,
    }: IPBREnviromentConfig) {

        this.diffuse = new CubeTexture({ images: diffuse, sRGB: false });

        this.specular = new CubeTexture({ images: specular, sRGB: false });

        this.brdfLUT = new Texture({ image: brdfLUT, sRGB: false, flipY: false, repeat: false });

    }

}

export default PBREnviroment;
