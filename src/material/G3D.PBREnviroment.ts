import CubeTexture from '../texture/G3D.CubeTexture';
import Texture from '../texture/G3D.Texture';

class PBREnviroment {

    diffuse = null;

    specular = null;

    brdfLUT = null;

    constructor({ diffuse, specular, brdfLUT }) {

        this.diffuse = new CubeTexture({ images: diffuse, sRGB: true, flipY: false });

        this.specular = new CubeTexture({ images: specular, sRGB: true, flipY: false });

        this.brdfLUT = new Texture({ image: brdfLUT, flipY: false, sRGB: false, repeat: false });

    }

}

export default PBREnviroment;