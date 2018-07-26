class Skybox {

    scene;
    skyboxSize;
    cubeMapMesh;
    cubeMapTexture;

    constructor(scene, faceImages, skyboxSize = 100) {
        scene.skybox = this;
        this.scene = scene;
        this.skyboxSize = skyboxSize;
        this.cubeMapMesh = MeshBuilder.createSkyboxMesh(scene, skyboxSize);
        this.cubeMapTexture = new CubeTexture({
            front: faceImages.front,
            back: faceImages.back,
            left: faceImages.left,
            right: faceImages.right,
            top: faceImages.top,
            bottom: faceImages.bottom
        });
    }
}

export default Skybox;