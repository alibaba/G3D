const lightConfigList = {
    direction: [
        [-1, 2, 1, 4.0],
        [1, 0, 1, 4.0],
        [-1, 0, 0, 1.0],
        [1, 2, -1, 1.0]
    ],
    ambient: [
        [4.0]
    ]
};


function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera, loader }
) {

    const attachMaterialBasic = function (mesh, r, g, b, image) {
        mesh.materials.default.ambientColor.r = r / 30;
        mesh.materials.default.ambientColor.g = g / 30;
        mesh.materials.default.ambientColor.b = b / 30;
        mesh.materials.default.diffuseColor.r = r / 30;
        mesh.materials.default.diffuseColor.g = g / 30;
        mesh.materials.default.diffuseColor.b = b / 30;
        mesh.materials.default.specularColor.r = r;
        mesh.materials.default.specularColor.g = g;
        mesh.materials.default.specularColor.b = b;
        mesh.materials.default.glossiness = 2;

        const texture = new G3D.Texture({ image, repeat: false });
        // texture.image = image;

        mesh.materials.default.specularEnvMapTexture = texture;
    }

    const engine = new G3D.Engine(canvas);

    const scene = new G3D.Scene(engine);

    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 0;
    camera.beta = 20;
    camera.radius = 60;
    camera.far = 400;

    controlArcRotateCamera(canvas, camera);

    lightConfigList.direction.forEach(([x, y, z, intensity]) => {
        const light = new G3D.DirectionalLight(scene);
        light.direction.x = x;
        light.direction.y = y;
        light.direction.z = z;
        light.intensity = intensity;
    });

    lightConfigList.ambient.forEach(([intensity]) => {
        const light = new G3D.AmbientLight(scene);
        light.intensity = 4.0;
    });

    G3D.MeshBuilder.createCoordinate(scene, 6000);

    let mesh = null;
    loader.loadText(
        'http://g.alicdn.com/gama/assets/0.0.7/assets/models/ring/ring.txt',
        function (text) {
            mesh = G3D.MeshBuilder.createFromStlModel(scene, text);
            mesh.position.y = 10;
            // mesh.geometry.mergeNormals();
            check();
        }
    )

    let imageReady = false;
    const image = new G3D.Env.Image();
    image.crossOrigin = true;
    image.onload = function () {
        imageReady = true;
        check();
    }
    image.src = '//img.alicdn.com/tfs/TB1_QdsolHH8KJjy0FbXXcqlpXa-1280-573.png';

    let checked = false;
    function check() {
        if (imageReady && mesh && !checked) {
            attachMaterialBasic(mesh, 239, 190, 98, image);
            check = true;
        }
    }

    function render() {
        mesh && (mesh.rotation.y += 0.5);
        scene.render();
        requestAnimationFrame(render);
    }
    render();

}

export default main;