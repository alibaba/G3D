import CubeTexture from "../texture/cube-texture";
import Texture from "../texture/texture";

interface IPBREnviromentConfig {
    diffuse: any;
    specular: any;
    brdfLUT: {
        [propName: string]: any,
    };
}

class PBREnviroment {

    public diffuse: CubeTexture;

    public specular: CubeTexture;

    public brdfLUT: Texture;

    public greyness: number = 0;

    constructor({ diffuse, specular, brdfLUT }: IPBREnviromentConfig) {

        this.diffuse = new CubeTexture({ images: diffuse, sRGB: true, flipY: false });

        this.specular = new CubeTexture({ images: specular, sRGB: true, flipY: false });

        this.brdfLUT = new Texture({ image: brdfLUT, flipY: false, sRGB: false, repeat: false });

    }

}

export default PBREnviroment;
