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

如果你希望通过 `script` 标签来引入 G3D, 你可以在 G3D 的 `dist` 目录下找到 `g3d.min.js` 文件。你可以把这个文件放在自己的服务器上，然后使用 `script` 标签引用；或者，你也可以直接引用 `https://unpkg.com/g3d@latest/dist/g3d.min.js`。

```html
<script src="https://unpkg.com/g3d@latest/dist/g3d.min.js"></script>

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

场景(Scene)中包含了一个三维的空间。在三维空间中，物体的位置使用三个坐标值(x, y, z)来表示。然后我们创建了一个环绕透视相机(RotatePerspectiveCamera)，这个相机可以在一个球面上环绕着原点旋转，并始终把镜头对准原点。相机的 `alpha` 和 `beta` 参数确定了相机在球面上的位置，而相机的 `radius` 参数确定了球面的大小。

```javascript
const camera = new G3D.RotatePerspectiveCamera(scene);
camera.alpha = 0;
camera.beta = 0;
camera.radius = 8;
```

![](https://gw.alicdn.com/tfs/TB1Z7RWo4TpK1RjSZR0XXbEwXXa-458-359.png)

在上面的 playground 中，你可以在右侧渲染区域拖动鼠标以从各个视角查看场景（这是在 `main` 函数之外完成），本质上，就是更改了相机的 `alpha` 和 `beta` 参数。你也可以在 `render` 函数中改变相机的这两个参数，看看会发生什么。比如，当你在 `render` 函数中为 `camera.alpha` 加上固定的数值 1，相机就会自动围绕场景旋转。

```javascript
function render() {
    camera.alpha += 1;
    ...
}
```

![](https://gw.alicdn.com/tfs/TB1LpKpo5LaK1RjSZFxXXamPFXa-454-359.png)

## 光源

光照是 3D 渲染的基础，除了自身会发光的物体，大部分物体都是依靠反射环境里的光线来获得颜色。在上面的例子里，我们创建了一束平行光。然后，我们指定了这束平行光的颜色、方向、密度。这里，光的方向为 (1, 0, 1)，光的方向平行于从 (1, 0, 1) 到原点 (0, 0, 0) 的矢量。（所以从语义上来说，平行光的「方向」是 (-1, 0, -1)，与我们设定的值 (1, 0, 1) 正好相反，这是 G3D 的约定。）

```javascript
const light1 = new G3D.DirectionalLight(scene);
light1.color = {r: 255, g: 200, b: 200};
light1.direction = {x: 1, y: 0, z: 1};
light1.intensity = 0.8;
```

![](https://gw.alicdn.com/tfs/TB1R3p0oVzqK1RjSZFoXXbfcXXa-454-384.png)

光的颜色会影响最终物体呈现的颜色，我们这里的光是浅红色的，而物体表面默认是白色的，所以最终物体的颜色呈现一点红色。

## 创建网格体

场景中可以被看见的对象，都是网格体(Mesh)，网格体由顶点和三角面组成。在上面这个例子中，我们使用 `G3D.MeshBuilder` 上的一些工厂函数来创建两个形状为内置几何体的面网格体。

1. 首先我们使用 `MeshBuilder.createPlane(scene, width, height)` 方法创建了一个矩形平面，宽度和高度分别为 6 和 4。初始状态下矩形的中心点落在原点 (0, 0, 0) 上，我们设置矩形的位置(position)的 z 坐标值为 -1，这样就把矩形沿 Z 轴负方向平移了 1 个单位，平移后矩形平面的中心点落在 (0, 0, -1) 上。
2. 然后，我们使用 `MeshBuilder.createSphere(scene, radius[, widthSegs, heightSegs])` 方法创建了一个球体，指定半径为 1。同样，初始状态下球体的中心点也落在原点 (0, 0, 0) 上，我们设置其位置(position)的 z 坐标值为 1，这样就讲球体沿 Z 轴正方向平移了 1 个单位，平移后球体的中心点落在 (0, 0, 1) 上。

```javascript
const m1 = G3D.MeshBuilder.createPlane(
scene, 6, 4
);
m1.position.z = -1;

const m2 = G3D.MeshBuilder.createSphere(
scene, 1
);
m2.position.z = 1;
```

![](https://gw.alicdn.com/tfs/TB1PLF6o7zoK1RjSZFlXXai4VXa-467-359.png)

## 开始渲染

最后，让我们开始渲染场景！通常，你只需要调用一次 `scene.render()` 即可将场景绘制在 canvas 上，但是当场景中的任何元素——包括相机，光源，网格体等等——发生了变化，canvas 上却不会实时地更新。你需要再次调用 `scene.render()` 方法使这些变化生效。

一种常用的实践方案是，创建一个名为 `render` 的函数，函数结束时指定下一帧再次调用该函数，这样就开启一个「渲染循环」，每一帧都会执行一次循环体，并调用 `scene.render()`，这样就能保证 canvas 中渲染出的内容一直是最新的。

```javascript
function render(){
    scene.render();
    requestAnimationFrame(render);
}
```

万事俱备，只欠东风。最后，我们调用 `render()` 方法，就可以开始渲染了！

## 小结

这一节，我们了解了一些关于 3D 编程的基本知识和 G3D 引擎的基本使用方法，包括场景，光照，网格体等基本概念。希望这篇教程能够对你有所帮助。
