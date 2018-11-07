function main(
    G3D,
    { canvas, requestAnimationFrame, controlRotateCamera, loader, pbrAssets }
) {

    pbrAssets('apartment').ready((specular, diffuse, lut) => {

        loader.loadBlob(
            '/assets/diamond-ring/1.stl',
            function (m1) {

                loader.loadBlob(
                    '/assets/diamond-ring/2.stl',
                    function (m2) {
                        loader.loadBlob(
                            '/assets/diamond-ring/3.stl',
                            function (m3) {

                                loader.loadImageQueue({
                                    leftR: 'https://gw.alicdn.com/tfs/TB12wTkd4jaK1RjSZFAXXbdLFXa-512-512.jpg',
                                    rightR: 'https://gw.alicdn.com/tfs/TB1Lku7dVzqK1RjSZFCXXbbxVXa-512-512.jpg',
                                    topR: 'https://gw.alicdn.com/tfs/TB1RfC8dW6qK1RjSZFmXXX0PFXa-512-512.jpg',
                                    bottomR: 'https://gw.alicdn.com/tfs/TB1seK9d5rpK1RjSZFhXXXSdXXa-512-512.jpg',
                                    frontR: 'https://gw.alicdn.com/tfs/TB13jK7d3HqK1RjSZFkXXX.WFXa-512-512.jpg',
                                    backR: 'https://gw.alicdn.com/tfs/TB1FDbnd4jaK1RjSZKzXXXVwXXa-512-512.jpg',
                                    leftE: 'https://gw.alicdn.com/tfs/TB1CWvsd4TpK1RjSZR0XXbEwXXa-512-512.jpg',
                                    rightE: 'https://gw.alicdn.com/tfs/TB1zrbsd6TpK1RjSZKPXXa3UpXa-512-512.jpg',
                                    topE: 'https://gw.alicdn.com/tfs/TB1SJDsdYvpK1RjSZPiXXbmwXXa-512-512.jpg',
                                    bottomE: 'https://gw.alicdn.com/tfs/TB1oWvsd4TpK1RjSZR0XXbEwXXa-512-512.jpg',
                                    frontE: 'https://gw.alicdn.com/tfs/TB1wfPsdVzqK1RjSZFCXXbbxVXa-512-512.jpg',
                                    backE: 'https://gw.alicdn.com/tfs/TB1ZxYsd7voK1RjSZPfXXXPKFXa-512-512.jpg',
                                }, images => {

                                    const { leftR, rightR, topR, bottomR, frontR, backR,
                                        leftE, rightE, topE, bottomE, frontE, backE } = images;

                                    const refractionMapImages = {
                                        left: leftR, right: rightR, top: topR, bottom: bottomR, front: frontR, back: backR,
                                    };
                                    const envMapImages = {
                                        left: leftE, right: rightE, top: topE, bottom: bottomE, front: frontE, back: backE,
                                    };

                                    const engine = new G3D.Engine(canvas);

                                    const scene = new G3D.Scene(engine);

                                    const camera = new G3D.RotatePerspectiveCamera(scene);
                                    camera.alpha = 45;
                                    camera.beta = 35;
                                    camera.radius = 0.04;
                                    camera.near = 0.001;
                                    camera.far = 100;

                                    controlRotateCamera(canvas, camera);

                                    // const mesh = G3D.MeshBuilder.createSphere(scene, 2);

                                    const mesh1 = G3D.MeshBuilder.createFromStlModel(scene, m1);
                                    mesh1.geometry.facing = G3D.Geometry.BACK;
                                    const mesh2 = G3D.MeshBuilder.createFromStlModel(scene, m2);
                                    mesh2.geometry.facing = G3D.Geometry.BACK;
                                    const mesh3 = G3D.MeshBuilder.createFromStlModel(scene, m3, { geometry: { mergeNormals: true } });

                                    mesh1.materials.default = new G3D.GemMaterial({
                                        refraction: new G3D.CubeTexture({ images: refractionMapImages, sRGB: false }),
                                        env: new G3D.CubeTexture({ images: envMapImages, sRGB: false })
                                    });

                                    mesh2.materials.default = new G3D.GemMaterial({
                                        refraction: new G3D.CubeTexture({ images: refractionMapImages, sRGB: false }),
                                        env: new G3D.CubeTexture({ images: envMapImages, sRGB: false })
                                    });

                                    const pbrEnv = new G3D.PBREnviroment({
                                        diffuse,
                                        specular,
                                        brdfLUT: lut
                                    });

                                    const mtl = new G3D.PBRMaterial();
                                    mtl.pbrEnviroment = pbrEnv;
                                    mtl.albedoColor = { r: 256*3, g: 256*3, b: 256*3 };

                                    mtl.metallic = 0.99;
                                    mtl.roughness = 0.1;

                                    mesh3.materials.default = mtl;

                                    window.mesh = mesh3;

                                    const mesh = new G3D.Mesh(scene);
                                    mesh1.parent = mesh;
                                    mesh2.parent = mesh;
                                    mesh3.parent = mesh;

                                    mesh.rotation.x = 270;

                                    G3D.MeshBuilder.createCoordinate(scene, 300);

                                    function render() {
                                        mesh.rotation.y += 0.2;
                                        scene.render();
                                        requestAnimationFrame(render);
                                    }
                                    render();
                                })
                            }
                        )
                    }
                )
            }
        )
    });
}

export default main;