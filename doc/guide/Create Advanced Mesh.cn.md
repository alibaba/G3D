# 创建网格体（高级用法）

上一节，我们了解了如何通过自己构造顶点数据创建自定义形状的网格体。G3D 会为每一个网格体创建一些数据块(Buffer)，将顶点、法线、顶点索引等数据填入 Buffer 中，然后使用 Buffer 与更底层的 WebGL 系统进行操作。如果场景中的网格体比较多，那么 Buffer 的数量也会比较多；在绘制场景的时候，也需要频繁地切换 Buffer，这都造成了一些不必要的开销。实际上，通过一些高级技巧，可以大幅减少 Buffer 的数量和切换成本。

这一节，我们就来介绍如何显式地使用数据块 Buffer 来创建几何体。

## 线状网格体

我们从一个最简单的例子开始看，假设我们现在需要创建如图所示的两个网格体 AB 和 CD，每个网格体都是一根长度为 1 的线段。

![](https://gw.alicdn.com/tfs/TB1Kx18qRLoK1RjSZFuXXXn0XXa-416-389.png)

接下来，让我们看下面这个例子。这个例子有一点长：

<a class="jsbin-embed" href="https://jsbin.com/befelog/latest/embed?js,output&height=500px">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?4.1.7"></script>

这个示例代码的基本结构和之前很类似，只不过将创建网格体的过程封装在了四个独立的函数 `createMeshes()`，`createMeshesWithBuffers()`，`createMeshesSharedBuffers()` 和 `createMeshesSharedBuffersSO()` 中。示例默认情况下会调用 `createMeshes()` 函数来创建网格体。我们可以把这一行注释掉，改为调用另外三个函数中的任意一个，看上去效果是一样的。但是，这四个函数的实现却完全不同。这一节，我们将仔细研究这四个函数的实现，并帮助你理解网格体背后的数据结构。

```
// create engine, scene, camera and lights

createMeshes();
// createMeshesWithBuffers();
// createMeshesSharedBuffers();
// createMeshesSharedBuffersSO();
```

第一个函数 `createMeshes()` 创建网格体的方式，和上一节中创建折线段是一致的，这是最基础的一种方式：通过显式地传入顶点和顶点索引来创建网格体。

```javascript
const v1 = [
    1, 0, 0, // A
    1, 1, 0  // B
];
const i1 = [0, 1];
const m1 = new G3D.LineMesh(scene);
m1.geometry = new G3D.LineGeometry({
    vertices: v1,
    indices: { default: i1 }
});

// create m2 is similar
```

我们分别创建了两个顶点数组 `v1` 和 `v2`，两个顶点索引数组 `i1` 和 `i2`，然后分别创建网格体 `m1` 和 `m2`。此时，`LineGeometry` 的构造函数会把传入的数组转化为 Buffer 保存起来。实际上，我们也可以在 `LineGeometry` 的构造函数外，显式地将 `Buffer` 先创建出来，然后传入构造函数。`createMeshesWithBuffers` 就是这样做的。

```javascript
const v1 = [
    1, 0, 0, // A
    1, 1, 0  // B
];
const v1Buffer = new G3D.Buffer({ data: new Float32Array(v1) });
const v1BufferView = new G3D.BufferView({ buffer: v1Buffer });
const i1 = [0, 1];
const i1Buffer = new G3D.ElementBuffer({ data: new Uint32Array(i1) });
const i1BufferView = new G3D.ElementBufferView({
    buffer: i1Buffer,
    mode: 'LINES',
    count: 2
});
const m1 = new G3D.LineMesh(scene);
m1.geometry = new G3D.LineGeometry({
    vertices: v1BufferView,
    indices: { default: i1BufferView }
});

// create m2 is similar
```

对顶点数组 `v1` 和 `v2`，我们：

1. 基于数组创建 `Float32Array` 类型化数组；
2. 基于类型化数组创建一个 `G3D.Buffer` 对象；
3. 基于此 `Buffer` 对象创建一个 `G3D.BufferView` 对象；
4. 将 `BufferView` 对象代替顶点数组作为 `vertices` 字段传入 `LineGeometry` 构造函数。

对顶点索引数组 `i1` 和 `i2`，我们：

1. 基于数组创建 `Uint32Array` 类型化数组；
2. 基于类型化数组创建一个 `G3D.ElementBuffer` 对象；
3. 基于此 `ElementBuffer` 对象创建一个 `G3D.ElementBufferView` 对象，此时要指定几何体类型 `LINES`，以及包含顶点的数量 2；
3. 将 `ElementBufferView` 对象代替 `indices.default` 传入 `LineGeomtry` 构造函数。

> 注意，`Buffer` 和 `ElementBuffer` 是真实的数据块，其创建过程中包含了真实的内存分配、数据填充等操作；而 `BufferView` 和 `ElementBufferView` 则是「数据块的视图」，它包含了对数据块 `Buffer` 的引用，还包含了少量「定义数据块中哪些数据属于此视图」的信息。

![](https://gw.alicdn.com/tfs/TB1LU14qPDpK1RjSZFrXXa78VXa-606-290.png)

可以看出，两个网格体 `m1` 和 `m2` 分别创建了各自的顶点数据块和顶点索引数据块，因此这与第一个函数 `createMeshes()` 本质上是一样的。接下来，我们将合并两个网格体的数据块，也就是说，我们将只创建 1 个顶点数据块和 1 个顶点索引数据块，使两个网格体通过不同数据视图的方式来共享数据块。看看第三个函数 `createMeshesSharedBuffers()` 是怎么做的：

```javascript
const v = [
    1, 0, 0, // A
    1, 1, 0, // B
    0, 0, 1, // C
    0, 1, 1  // D
];
const vBuffer = new G3D.Buffer({ data: new Float32Array(v) });
const vBufferView = new G3D.BufferView({ buffer: vBuffer });
const i = [0, 1, 2, 3];
const iBuffer = new G3D.ElementBuffer({ data: new Uint32Array(i) });

const iBufferView1 = new G3D.ElementBufferView({
    buffer: iBuffer,
    mode: 'LINES',
    count: 2
});
const iBufferView2 = new G3D.ElementBufferView({
    buffer: iBuffer,
    mode: 'LINES',
    byteOffset: 4 * 2,
    count: 2
});

const m1 = new G3D.LineMesh(scene);
m1.geometry = new G3D.LineGeometry({
    vertices: vBufferView,
    indices: { default: iBufferView1 }
});

const m2 = new G3D.LineMesh(scene);
m2.geometry = new G3D.LineGeometry({
    vertices: vBufferView,
    indices: { default: iBufferView2 }
})
```

在这个函数中，不再有独立的顶点数组 `v1` 和 `v2`，我们将其合并为数组 `v`，其中包含了 ABCD 四个顶点的坐标信息；基于这个数组单独创建了顶点数据块 `vBuffer`，并进一步创建了顶点数据视图 `vBufferView`。创建网格几何体 `m1` 和 `m2` 时，我们都把 `vBufferView` 作为顶点数据传入。

同时，我们也不再有独立的顶点索引数组 `i1` 和 `i2`，我们将其合并为数组 `i`，数组 `i` 的值是 [0,1,2,3]，同样我们为其创建顶点索引数据块 `iBuffer`；然后，我们分别创建了两个顶点索引数据视图 `iBufferView1` 和 `iBufferView2`，两者唯一的不同是 `byteOffset` 字段，前者为 0 而后者为 8，这说明，`iBufferView1` 表示的是从 0 开始的 2 个顶点，即 [0,1]，而 `iBufferView2` 表示的是索引从 2 （`byteOffset` 是字节偏移量，这里我们使用了 `Uint32Array`，每一项是 32 位整数占据 4 个字节，所以 8 个字节相当于 2 个整数项）开始的 2 个顶点，即 [2,3]。

![](https://gw.alicdn.com/tfs/TB1IQK.qFzqK1RjSZFoXXbfcXXa-751-275.png)

虽然我们创建了 2 个不同的 `ElementBufferView`，但是由于它们引用的 `ElementBuffer` 是同一个，所以实际上只有一次创建 `ElementBuffer` 的开销，而实际进行绘制的时候，也不需要频繁地切换。

有时候，顶点数据块中并不全是顶点的位置数据，我们在创建 `BufferView` 的时候也可以通过指定一些参数来描述 `Buffer` 中的一个子集。下面，让我们「没事找事」地为顶点数组 `v` 中添加一些无意义的数据（也许在后面的某些时刻，这些数据还会有其他作用），然后在创建 `BufferView` 的时候将这些无意义的数据筛出去。让我们看看最后一个函数 `createMeshesSharedBuffersSO()` 是怎么做的。

```javascript
const v = [
    99, 99,
    1, 0, 0, 99,  // A
    1, 1, 0, 99,  // B
    0, 0, 1, 99,  // C
    0, 1, 1, 99   // D
];
const vBuffer = new G3D.Buffer({ data: new Float32Array(v) });
const vBufferView = new G3D.BufferView({
    buffer: vBuffer,
    byteOffset: 4 * 2,
    byteStride: 4 * 4
});
const i = [0, 1, 2, 3];
const iBuffer = new G3D.ElementBuffer({ data: new Uint32Array(i) });
// below is the same with createMeshesSharedBuffers()
```

`v` 的头部添加了 2 个无用的 99，然后在每个顶点的三个数据后面，也增加了 1 个无用的 99。我们在创建 `vBufferView` 时，额外指定了两个参数 `byteOffset` 和 `byteStride`。`byteOffset` 表示初始位置偏移的字节数，由于这里有 2 个无用值，所以跳过 8 个字节（同样，由于我们采用 `Float32Array`，每个数值占 4 个字节）；`byteStride` 表示顶点数据和顶点数据间的间隔，当我们不指定的时候，认为是顶点和顶点之间是「严丝合缝」，没有多余数据的，而我们指定时，需要指定顶点本身和多余数据占用的总字节数，这里即 16 个字节。

图

在创建线状网格体时，`BufferView` 的 `byteOffset` 和 `byteStride` 两个参数似乎没有太大用处，但是当我们创建面状网格体时，这两个参数就会发挥重要的作用。

## 面状网格体

接下来，我们看看如何创建多个面状几何体，且共享数据块。假设我们需要创建如下两个三角形网格体 ABC 和 DEF：

图

看这个例子是怎么做的：

<a class="jsbin-embed" href="https://jsbin.com/safaxuh/latest/embed?js,output&height=500px">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?4.1.7"></script>

我们在 `createMeshes()` 函数中完成了数据块、数据视图和网格体的创建。

```javascript
const v = [
//  position   normal     uv
    0, 0, 2,   1, 0, 0,   0, 0,  // A
    0, 0, 1,   1, 0, 0,   0, 0,  // B
    0, 1, 1,   1, 0, 0,   0, 0,  // C
    1, 0, 0,   0, 0, 1,   0, 0,  // D
    2, 0, 0,   0, 0, 1,   0, 0,  // E
    1, 1, 0,   0, 0, 1,   0, 0   // F
];
const vBuffer = new G3D.Buffer({ data: new Float32Array(v) });

const verticesBufferView = new G3D.BufferView({
    buffer: vBuffer,
    byteStride: 4 * 8,
    byteOffset: 0
});
const normalsBufferView = new G3D.BufferView({
    buffer: vBuffer,
    byteStride: 4 * 8,
    byteOffset: 4 * 3
});
const uvsBufferView = new G3D.BufferView({
    buffer: vBuffer,
    byteStride: 4 * 8,
    byteOffset: 4 * 6
});

const i = [0, 1, 2, 3, 4, 5];
const iBuffer = new G3D.ElementBuffer({ data: new Uint32Array(i) });
const iBufferView1 = new G3D.ElementBufferView({
    buffer: iBuffer,
    mode: 'TRIANGLES',
    count: 3
});
const iBufferView2 = new G3D.ElementBufferView({
    buffer: iBuffer,
    mode: 'TRIANGLES',
    count: 3,
    byteOffset: 4 * 3
});

const m1 = new G3D.Mesh(scene);
m1.geometry = new G3D.Geometry({
    vertices: verticesBufferView,
    normals: normalsBufferView,
    uvs: uvsBufferView,
    indices: { default: iBufferView1 }
});

const m2 = new G3D.Mesh(scene);
m2.geometry = new G3D.Geometry({
    vertices: verticesBufferView,
    normals: normalsBufferView,
    uvs: uvsBufferView,
    indices: { default: iBufferView2 }
});
```

首先，我们把顶点的位置、法线、UV 数据全部打包进一个数组 `v`，数组中每 8 个值为一组，表示一个顶点。这 8 个值中，前 3 个值表示位置，中间 3 个值表示法线，最后 2 个值表示 UV。根据这个数组创建一个 `Buffer` 对象。









  