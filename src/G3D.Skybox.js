
class Skybox {

    scene;
    cubeMapTexture;
    cubeMapMesh;
    skyboxSize;
    getReady;
    ready;

    constructor(scene, {
        front, back,
        left, right,
        top, bottom,
        skyboxSize,
    }) {
        scene.skybox = this;
        this.scene = scene;
        this.skyboxSize = skyboxSize;
        this.cubeMapMesh = MeshBuilder.createSkyboxMesh(scene, skyboxSize);

        const promises = [front, back, left, right, top, bottom].map(src =>
            new Promise((resolve, reject) => {
                const image = new Image();
                image.src = src;
                image.crossOrigin = true;
                image.onload = function(){resolve(image)}
            }
        ));

       this.getReady = Promise.all(promises)
       .then(images => {
            this.cubeMapTexture = new CubeTexture({
                front: images[0],
                back: images[1],
                left: images[2],
                right: images[3],
                top: images[4],
                bottom: images[5]
            });
        })
        .then(() => {
            this.ready = true;
        })
    }
}

export default Skybox;