# First Steps

G3D is a pure javascript 3D render engine compatible with WebGL. It depends on no DOM APIs but just a canvas(or canvas-like) object. This feature makes it possible to run on both browser environment and hybrid enviroment(such as Weex or ReactNative), using [GCanvas](https://alibaba.github.io/GCanvas/).


## Usage

G3D library is published on [NPM](https://www.npmjs.com/package/g3d). You need to install G3D first.

```dash
npm install g3d
```

And involve G3D in your own building progress(using Webpack, eg).

```javascript
import G3D from 'g3d';
```

If you want to load G3D through a `&lt;script&gt;` tag (thought we don't recommed you to do so), you can find a UMD file at `dist/g3d.min.js` inside package. You need to put it on your server and load it using a `&lt;script&gt;` tag.

```html
<script src="g3d.min.jd"></script>

<script>
    console.log(window.G3D);
</script>
```

## Basics

To create and render a 3D scene, you need to follow the progress:

1. Create an [engine](../docs/Engine), specify the canvas (a `CanvasHTMLElement` in web environment or a canvas-like object in hybrid environment).
2. Create a [scene](../docs/Scene), specify the engine you just created.
3. Create a [camera](../docs/Camera). In most situations, we need to create a [perspective camera](../docs/PerspectiveCamera), and here we create a [arc rotate camera](../docs/ArcRotateCamera) which extends from perspective camera.
4. Create some [lights](../docs/light). There're several types of light, here wo create a [directional light](../docs/DirectionalLight) and a [hemisphere light](../docs/HemisphereLight).
5. Create some [meshes](../docs/mesh). Here, we use [MeshBuilder](../docs/MeshBuilder) and create a cube mesh, and specify some [Material](../docs/StandardMaterial) options.
6. Tell scene to render.

```javascript
function run(G3D, canvas){

    // create 3d engine
    const engine = new G3D.Engine(canvas);

    // create a scene
    const scene = new G3D.Scene(engine);
    
    // create camera
    const camera = new G3D.RotatePerspectiveCamera(scene);
    camera.alpha = 45;
    camera.beta = 30;
    camera.radius = 12;
    camera.fov = 60;
    
    // create 3 lights
    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;
    
    const light2 = new G3D.HemisphereLight(scene);
    
    // create mesh
    const mesh = G3D.MeshBuilder.createCube(scene, 6);
    
    Object.assign(mesh.materials.default.diffuseColor, {r: 200, g: 100, b: 100});
    Object.assign(mesh.materials.default.specularColor, {r: 200, g: 100, b: 100});
    mesh.materials.default.glossiness = 10;
    
    return function () {
        mesh.rotation.y +=1;
        scene.render();
    }
}
```

Try to change some values and see what happened.

[Next Chapter](./Positions and Rotations).