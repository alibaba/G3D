# 原始材质

网格体的几何形状(geometry)决定了哪些像素会被着色，而网格体的材质(material)决定了这些像素最终的颜色是什么。

**原始材质**(RawMaterial)是 G3D 中最简单的一种材质，它完全不依赖于光照、相机等 3D 场景相关的信息。当我们为原始材质指定一种颜色后，最终材质被渲染出的颜色就完全等同于我们指定的颜色——不管场景中有没有光照，不管相机和网格体的相对位置如何。

看下面这个例子：

<a class="jsbin-embed" href="https://jsbin.com/xebajay/latest/embed?js,output&height=500px">JS Bin on jsbin.com</a>

这个 demo 创建了一个位于 X-Y 平面内，中心点位于原点，由两个三角形组成的正方形网格体，如下图所示。正方形由 4 个顶点（A、B、C、D）和 6 个顶点索引（ABC、ACD）组成。

![](https://gw.alicdn.com/tfs/TB1c54gvwDqK1RjSZSyXXaxEVXa-439-399.png)

我们是通过构造 vertices、normals、uvs 和 indices 数组来描述此网格体的顶点构成的。顶点坐标 vertices 图中已经标注了，法线 normals 则全部为 (0,0,1)，即指向 Z 轴正半轴方向。

```javascript
const mesh = new G3D.Mesh(scene);
mesh.geometry = new G3D.Geometry({
    vertices: [
        -1, -1, 0, // A
        1, -1, 0,  // B
        1, 1, 0,   // C
        -1, 1, 0   // D
    ],
    normals: [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ],
    uvs: [
        0, 0,  // A
        1, 0,  // B
        1, 1,  // C
        0, 1   // D
    ],
    indices: {
        default: [0, 1, 2, 0, 2, 3]
    }
});
```

然后，我们创建一个 RawMaterial 原始材质 `rMtl`，并为其指定颜色为 (200,100,100)。将 `rMtl` 赋值给 `mesh.materials.default` 属性，是因为在创建 geometry 的时候，indices 下也具有相同名称的 `default` 属性。这是因为，同一个网格体可以具有多个不同的「部件」，每个部件对应一个顶点索引数组和一个材质。这里的 `default` 可以使用任何更有意义的命名。

```javascript
const rMtl = new G3D.RawMaterial();
rMtl.color = {r: 200, g: 100, b: 100};
mesh.materials.default = rMtl;
```

然后，我们就获得了一个浅红色的正方形。正方形的材质是原始材质，其渲染出的颜色与赋值给 `rMtl.color` 属性的颜色完全一致。改变 `rMtl.color`，即可改变正方形的颜色，如下所示。

```javascript
rMtl.color.r = 100;
rMtl.color = {r: 100, g: 100, b: 100};
```

上面这个 demo 使用 dat.GUI 生成了几个可交互的滑块，我们可以手动调整这些属性的值并观察效果。注意，赋值给 `rMtl.color` 的三个分量，取值范围是 [0, 255]。

原始材质不仅可以具有颜色，还可以具有纹理。比如，我们可以加载下面这张图片：

![](https://img.alicdn.com/tfs/TB11aE5XKSSBuNjy0FlXXbBpVXa-256-256.png)

然后创建一个纹理对象，将图片传入。这里的 `image` 是 Image 对象。

```javascript
loader.loadImage(
    '//img.alicdn.com/tfs/TB11aE5XKSSBuNjy0FlXXbBpVXa-256-256.png',
    function(image){
        // (image instanceOf Image) === true
        const texture = new G3D.Texture({image});
    }
);
```

当我们勾选滑块后的 texture 选项框后，`texture` 对象就会赋值给 `rMtl.texture` 属性，纹理就会贴在这个正方形上。

```
rMtl.texture = texture;
```

如果在勾选前，材质的颜色值不是 (255,255,255) 纯白色，那么也许你会觉得纹理的颜色有点不对。这是因为，原始材质的纹理依然会受到材质颜色的影响。准确地说，纹理图片会按照 RGB 逐分量地会乘以归一化后的材质颜色。举个例子，如果材质颜色的 R 分量是 127（即 `rMtl.color.r === 127`），归一化后的材质颜色红色分量为 0.5，那么材质纹理上的所有像素的颜色的红色分量，都会乘以 0.5，才会等于最终呈现在屏幕上的颜色（的红色分量）。总而言之：

* 如果 rMtl.texture 不存在，则最终的颜色 = color。
* 如果 rMtl.texture 存在，则最终的颜色 = textureColor * color（逐分量相乘）。

最后，我们来理解一下 UV。在创建几何体时，我们传入了名为 uvs 的数组，对每一个顶点而言，uv 提供了两个值：对顶点 A，UV 的值为 (0,0)，对顶点 B，UV 的值为 (1,0)。这一对值表示此顶点对应的「纹理坐标」：(0,0) 位于纹理的左下角，而 (1,1) 位于纹理的右上角。在这个例子中，顶点 A 对应了纹理的左下角，顶点 C 对应了纹理的右上角，进而通过这种形式把顶点坐标和纹理坐标映射了起来，这样 WebGL 才能知道如何把纹理「贴」到几何体上。

```javascript
uvs: [
    0, 0,  // A
    1, 0,  // B
    1, 1,  // C
    0, 1   // D
]
```

我们可以试着改变一下 UV 的数值，比如把 B 点改成 (1,1) 或 (0.5,0)，然后观察一下纹理被贴上去方式是如何变化的。

其实，纹理坐标系的 (0,0) 并不总是位于左下角。实际上 WebGL 默认的纹理坐标是位于左上角的。但是由于大部分 3D 应用中（OpenGL 应用中），纹理坐标位于左下角，WebGL 提供了一个选项开关（pixelStorei 中的 UNPACK_FLIP_Y_WEBGL）来允许开发者倒置纹理坐标系。G3D 已默认为所有纹理开启此选项。如果你希望为某个单独的纹理关闭此选项，可在初始化时传入值为 false 的 flipY 参数。

```javascript
new G3D.Texture({image, flipY: false}); // flipY is true by default
```

原始材质是一种极为基础的材质，由于它不受光照影响，所以它对现实的模拟也极为有限。我们创建一个具有原始材质的立方体，也许能够体会得更深一些：

<a class="jsbin-embed" href="https://jsbin.com/ludubot/latest/embed?js,output&height=500px">JS Bin on jsbin.com</a>

我们在这个场景中放置了一个立方体，但是由于立方体是纯色的原始材质，所以我们几乎无法区分它的 3D 细节，因为看上去这个立方体就像是一个六边形的色块。后面几章，我们将讨论一些更高级的材质，这些材质将会有更好的视觉效果。

## 小结

这一节，我们大致了解了材质和纹理的基础用法，并学习了 G3D 中最基础的一种材质：原始材质。


<script src="https://static.jsbin.com/js/embed.min.js?4.1.7"></script>
