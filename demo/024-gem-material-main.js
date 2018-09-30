function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera, loader }
) {

    loader.loadText(
        '/assets/Pear_cut_gemstone.stl',
        function (text) {

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
                camera.beta = 5;
                camera.radius = 250;
        
                controlArcRotateCamera(canvas, camera);
        
                // const mesh = G3D.MeshBuilder.createSphere(scene, 2);

                const mesh = G3D.MeshBuilder.createFromStlModel(scene, text);
                mesh.rotation.z = 90;
                mesh.position.z = -20;
                mesh.position.y = 20;

                mesh.materials.default = new G3D.GemMaterial({
                    refraction: new G3D.CubeTexture({ images: refractionMapImages, sRGB: false }),
                    env: new G3D.CubeTexture({ images: envMapImages, sRGB: false })
                });
        
                G3D.MeshBuilder.createCoordinate(scene, 300);
        
                function render() {
                    camera.alpha += 1;
                    scene.render();
                    requestAnimationFrame(render);
                }
                render();
            })





        }
    )




}

export default main;