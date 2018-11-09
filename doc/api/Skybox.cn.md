# Skybox

天空盒。

## 构造函数

```javascript
new G3D.Skybox(scene, images, size);
```

### 参数

| 名称   | 类型                | 描述                                                                            |
| ------ | ------------------- | ------------------------------------------------------------------------------- |
| scene  | G3D.Scene           | 天空盒所属的场景                                                                |
| images | {front: Image, ...} | 一个对象，包含 front / back / top / bottom / left / right 6个面的天空盒纹理图片 |
| size   | Number              | 天空盒的尺寸，默认为 100                                                        |

## 示例

```javascript
const engine = new G3D.Engine(canvas);
const scene = new G3D.Scene(engine);

const camera = new G3D.RotatePerspectiveCamera(scene);

const skybox = new G3D.Skybox(scene, {
    front: frontImage,
    back: backImage,
    top: topImage,
    bottom: bottomImage,
    left: leftImage,
    right: rightImage
}, 200);

scene.render();
```