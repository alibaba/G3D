class GemMaterial extends Material {

    refractionCubeMap = null;
    envCubeMap = null;

    constructor({ refraction, env }) {
        super();

        this.refractionCubeMap = refraction;
        this.envCubeMap = env;

    }

    getDefines() {
        const defines = [];
        return defines;
    }

}

export default GemMaterial;