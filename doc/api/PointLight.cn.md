# PointLight

点光源，继承自 [BaseLight](./BaseLight)。

## 构造函数

```javascript
new G3D.PointLight(scene);
```

### 参数

| 名称          | 类型                              | 描述                                 |
| ------------- | --------------------------------- | ------------------------------------ |
| scene         | G3D.Scene                         | 光源所属的场景                       |

## 属性

| 名称          | 类型                              | 描述                                 |
| position      | {x: Number, y: Number, z: Number} | 位置                                 |
| radius        | Number                            | 光源半径，即标准强度位置距光源的距离 |
| castShadow    | boolean                           | 产生阴影，默认为 false               |
| castShadowFov | Number                            | 产生阴影的视场角，默认为 60          |

## 示例

```javascript
const light = new PointLight(scene);
light.color = {r: 255, g: 0, b: 0};
light.position = {x : 3, y : 4, z : 0};
light.radius = 5;
```