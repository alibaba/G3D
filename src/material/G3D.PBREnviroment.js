class PBREnviroment {

    diffuse = new CubeTexture();

    specular = new CubeTexture();

    brdfLUT = null;

    constructor({ brdfLUT }) {

        this.brdfLUT = new Texture({ image: brdfLUT });


        this.brdfLUT.flipY = false;
        this.brdfLUT.clamp = true;
    }

}

export default PBREnviroment;