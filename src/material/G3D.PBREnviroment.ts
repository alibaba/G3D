import CubeTexture from '../texture/G3D.CubeTexture';
import Texture from '../texture/G3D.Texture';

interface IPBREnviromentConfig {
    diffuse: any,
    specular: any,
    brdfLUT: {
        [propName: string]: any
    }
}

class PBREnviroment {

    diffuse: CubeTexture;

    specular: CubeTexture;

    brdfLUT: Texture;

    greyness: number = 1;

    constructor({ diffuse, specular, brdfLUT }: IPBREnviromentConfig) {

        this.diffuse = new CubeTexture({ images: diffuse, sRGB: true, flipY: false });

        this.specular = new CubeTexture({ images: specular, sRGB: true, flipY: false });

        this.brdfLUT = new Texture({ image: brdfLUT, flipY: false, sRGB: false, repeat: false });

    }

}

export default PBREnviroment;