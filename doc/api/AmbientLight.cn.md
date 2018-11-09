# AmbientLight

环境光，继承自 [BaseLight](./BaseLight)。

## 构造函数

```javascript
new G3D.AmbientLight(scene);
```

### 参数

| 名称  | 类型      | 描述           |
| ----- | --------- | -------------- |
| scene | G3D.Scene | 光源所属的场景 |

## 示例

```javascript
const light = new AmbientLight(scene);
light.color = {r: 255, g: 0, b: 0};
light.intensity = 0.3;
```