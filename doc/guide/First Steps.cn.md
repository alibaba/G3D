# 万事开头难

G3D 是一款基于 WebGL 实现的 JavaScript 3D 渲染引擎。本系列教程将教会你如何使用 G3D。

## 安装和引用

G3D 库已经发布在 [NPM](https://www.npmjs.com/package/g3d) 上；你需要手动安装 G3D。

```dash
npm install g3d --save
```

然后在自己的代码里，把 G3D 引入进来。通常，你需要使用一些前端构建工具来辅助（如 Webpack）。

```javascript
import G3D from 'g3d';
console.log(G3D);
```

如果你希望通过 `&lt;script&gt;` 标签来引入 G3D, 你可以在 G3D 的 `dist` 目录下找到 `g3d.min.js` 文件。你可以把这个文件放在自己的服务器上，然后使用 `&lt;script&gt;` 标签引用；或者，你也可以直接引用 `https://unpkg.com/g3d@0.2.1/dist/g3d.min.js`。

```html
<script src="https://unpkg.com/g3d@0.2.1/dist/g3d.min.js"></script>

<script>
    console.log(G3D);
</script>
```

## 基础

遵循以下几个步骤，以创建最基础的 3D 场景。

1. 创建一个 [engine](../docs/Engine)（引擎），传入 canvas 对象。
2. 创建一个 [scene](../docs/Scene)（场景），传入刚刚创建好的 engine。
3. 创建一个 [camera](../docs/Camera)（相机）。在大多数情况下，你需要创建 [perspective camera](../docs/PerspectiveCamera)（透视相机），这里我们创建一个[rotate perspective camera](../docs/RotatePerspectiveCamera)（旋转透视相机），它继承自透视相机。
4. 创建一些 [lights](../docs/light)（光源）。G3D 提供了几种不同类型的光源，这里我们创建了一个 [directional light](../docs/DirectionalLight)（平行光）。
5. 创建一些 [meshes](../docs/mesh)（网格体）。这里，我们使用 [MeshBuilder](../docs/MeshBuilder) 创建了一个 sphere mesh（球形的网格体）和一个 plane mesh（矩形的网格体）。
6. 使场景开始渲染。

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





[Next Chapter](./Positions and Rotations).