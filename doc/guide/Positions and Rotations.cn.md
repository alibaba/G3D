# 平移和旋转

关于 3D 场景中对象的一个基本问题是：它们**位于**何处？一个网格体(Mesh)被创建出来后，总是位于原点(0, 0, 0)的。如果想让它位于其他地方，就需要手动指定位置。

`G3D.Mesh` 类继承自 `G3D.Node` 类，而 `Node` 类具有三个属性，`position`，`rotation`，`scale`。这三个属性可用来表示物体在三维空间中的位置，旋转和缩放。

## 基本操作

网格体对象上的 `position`，`rotation` 和 `scale` 都是具有 `x`，`y` 和 `z` 属性的普通对象。更改网格体的 `position` 属性，就是在平移网格体，更改 `rotation` 就是在旋转网格体，更改 `scale` 就是在缩放网格体。你可以覆盖整个 `position` 对象（`rotation` 和 `scale` 同理）：

```javascript
mesh.position = {x: 5, y: 3, z: 4};
```

也可以逐个改写其中的 `x`，`y` 和 `z` 坐标值，两者是等价的：

```javascript
mesh.position.x = 5;
mesh.position.y = 4;
mesh.position.z = 3;
```

接下来，我们通过这个例子来深入理解平移，缩放和旋转。

<a class="jsbin-embed" href="https://jsbin.com/jarocek/latest/embed?js,output&height=500px">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?4.1.7"></script>

## 网格体

为了使场景更直观，我们首先创建了一个可视的坐标轴网格体。它由三根线段组成，红色表示 X 轴，绿色表示 Y 轴，蓝色表示 Z 轴。每一根线段的长度均为 10。

```javascript
const coord = G3D.MeshBuilder.createCoordinate(scene, 10);
```

然后，我们创建了长宽高均为 1 的一个立方体。

```javascript
const cube = G3D.MeshBuilder.createCube(scene, 1);
```

最后，我们又创建了一个坐标轴网格体，这个网格体的尺寸稍小一些（为 3），而且我们指定这个坐标轴网格体的**父节点**(parent)是立方体网格体。所谓父节点，是网格体「从属于」的那个节点，父节点通常也是网格体。当父节点发生平移，旋转和缩放时，子网格体也会跟着受到影响。也就是说，当我们移动立方体时，较小的坐标轴也会跟着动。

```javascript
const cubeCoord = G3D.MeshBuilder.createCoordinate(scene, 3);
cubeCoord.parent = cube;
```

## dat.GUI

然后，我们引入了 [dat.GUI](http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage) 这个工具库。这个简单精巧的工具库，能够帮助我们轻易地在页面右上角生成一个精致的仪表盘，在仪表盘上的操作可以实时地更新到代码中。

比如，我们可以通过 dat.GUI 创建了一个和 `cube.position.x` 属性绑定的滑块：

```javascript
folder.add(cube.position, 'x', -5, 5);
```

这就有点相当于：

```javascript
slider.onChange(function(value){
    cube.position.x = value;
});
```

接下来，我们为 `position`，`rotation`，`scale` 各自的 `x`，`y`，`z` 一共 9 个属性创建了 9 个滑块，你可以去试着拖拽滑块看看会发生什么。

## 描述平移，缩放

平移和缩放很直观。平移物体时，物体的位置发生了变化，从一处移动到了另一处。缩放物体时，物体的尺寸和体积发生了变化，似乎遭受了拉伸或挤压。

## 欧拉角：描述旋转

比较复杂的是旋转。事实上，业界存在多种描述物体旋转的方式，G3D 采取的是较传统的一种名为「欧拉角」的描述方式：通过 3 个数值 `x`，`y`，`z` 来描述。比如，我们可以将一个物体的欧拉角设定为 [30, 45, 60]，这意味着我们把这个物体围绕 X 轴旋转 30 度，围绕 Y 轴旋转 45 度，围绕 Z 轴旋转 60 度。

> 旋转的方向遵循右手螺旋法则：用右手的大拇指指向旋转轴的正方向，那么围绕此轴旋转的方向，就是右手的其他四个手指指向的方向。

```javascript
cube.rotation = {x: 30, y: 45, z: 60};
```

除了围绕三个轴的旋转角度值，欧拉角还需要指定围绕这三个轴旋转的发生顺序。因为，先围绕 X 轴旋转 30 度再围绕 Y 轴旋转 45 度，与先围绕 Y 轴旋转 45 度再围绕 X 轴旋转 30 度，两者的结果是完全不同的。G3D 中，采取了一种较为常见的顺序：ZYX 顺序，即：

1. 先围绕 Z 轴旋转指定的角度；
2. 再围绕 Y 轴旋转指定的角度，注意这里的 Y 轴已经是经过第 1 步变换后的 Y 轴，即示例中较小的那个坐标轴；
3. 最后围绕 X 轴旋转指定的角度，这里的 X 轴也已经是经过第 1、2 步变换后的。

调整这几个坐标值来旋转此立方体，你会发现，只有严格按照 ZYX 的顺序去调整，立方体的旋转才是严格围绕着对应轴的。

> 使用局部坐标系（较小坐标轴）描述时，欧拉角是 ZYX 顺序的；但是如果通过世界坐标系（较大坐标轴）来描述，你会发现是 XYZ 顺序的。

## 小结

这一节，我们简单讨论了关于 3D 空间中的平移、旋转和缩放。有时候，我们又把这三种操作统称为「变换」(transform)。