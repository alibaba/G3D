class Skybox {

    scene;
    skyboxSize;
    cubeMapMesh;
    cubeMapTexture;

    constructor(scene, cubeMapTexture, skyboxSize = 10) {
        scene.skybox = this;
        this.scene = scene;
        this.skyboxSize = skyboxSize;
        this.cubeMapMesh = MeshBuilder.createSkyboxMesh(scene, skyboxSize);
        this.cubeMapTexture = cubeMapTexture;
    }
}

export default Skybox;