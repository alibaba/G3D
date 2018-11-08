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

1. 创建一个渲染引擎(Engine)，传入 canvas 对象。
2. 创建一个场景(Scene)，传入刚刚创建好的渲染引擎。
3. 创建一个相机。在大多数情况下，你需要创建透视相机(PerspectiveCamera)，这里我们创建一个环绕透视相机(RotatePerspectiveCamera)，它继承自透视相机。
4. 创建一些光源。G3D 提供了几种不同类型的光源，这里我们创建了一个平行光源(DirectionalLight)。
5. 创建一些网格体(Mesh)。这里，我们创建了一个球形的网格体和一个矩形平面的网格体。
6. 使场景开始渲染。

<a class="jsbin-embed" href="https://jsbin.com/fiquyiz/latest/embed?js,output&height=500px">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?4.1.7"></script>

## 场景和相机

场景(Scene)中包含了一个三维的空间。在三维空间中，物体的位置使用三个坐标值(x, y, z)来表示。然后我们创建了一个环绕透视相机，这个相机可以在一个球面上环绕着原点旋转，并始终把镜头对准原点。相机的 `alpha` 和 `beta` 参数确定了相机在球面上的位置，而相机的 `radius` 参数确定了球面的大小。

```javascript
const camera = new G3D.RotatePerspectiveCamera(scene);
camera.alpha = 0;
camera.beta = 0;
camera.radius = 8;
```

图

在上面的 playground 中，你可以在右侧渲染区域拖动鼠标以从各个视角查看场景（这是在 `main` 函数之外完成），本质上，就是更改了相机的 `alpha` 和 `beta` 参数。你也可以在 `render` 函数中改变相机的这两个参数，看看会发生什么。比如，当你在 `render` 函数中为 `camera.alpha` 加上固定的数值1，相机就会自动围绕场景旋转。

```javascript
function render() {
    camera.alpha += 1;
    scene.render();
    requestAnimationFrame(render);
}
```

图

## 光源

光照是 3D 渲染的基础，没有光，