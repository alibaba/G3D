# DirectionalLight

平行光源，继承自 [BaseLight](./BaseLight)。

## 构造函数

```javascript
new G3D.DirectionalLight(scene);
```

### 参数

| 名称  | 类型      | 描述           |
| ----- | --------- | -------------- |
| scene | G3D.Scene | 光源所属的场景 |

## 属性

| 名称      | 类型                              | 描述                                           |
| --------- | --------------------------------- | ---------------------------------------------- |
| direction | {x: Number, y: Number, z: Number} | 从原点到光源的方向，默认为 {x: 0, y: 0, z: -1} |

## 示例

```javascript
const light = new DirectionalLight(scene);
light.color = {r: 255, g: 0, b: 0};
light.direction = {x : 1, y : 1, z : 1};
light.intensity = 1.5;
```