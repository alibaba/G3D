
class Skybox {

    _cubeMapTexture;
    _cubeMapMesh;
    _skyboxSize;
    _getReady;
    _scene;

    constructor(scene, {
        front, back,
        left, right,
        top, bottom,
        skyboxSize,
    }) {
        this._scene = scene;
        scene.skybox = this;

        const promises = [front, back, left, right, top, bottom].map(src =>
            new Promise((resolve, reject) => {
                const image = new Image();
                image.src = src;
                image.crossOrigin = true;
                image.onload = function(){resolve(image)}
            }
        ));

        Promise.all(promises).then(images => {
            this._cubeMapTexture = new CubeTexture({
                front: images[0],
                back: images[1],
                left: images[2],
                right: images[3],
                top: images[4],
                bottom: images[5]
            });
            this._getReady = true;
        });

        this._skyboxSize = skyboxSize;
        this._cubeMapMesh = MeshBuilder.createSkyboxMesh(scene, skyboxSize);
    }

    get getReady() {
        return this._getReady;
    }

    get cubeMapTexture() {
        return this._cubeMapTexture;
    }

    get cubeMapMesh() {
        return this._cubeMapMesh;
    }
}

export default Skybox;