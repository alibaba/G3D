# RotatePerspectiveCamera

环绕球面旋转的透视相机，继承自 [BasePerspectiveCamera](./BasePerspectiveCamera)。

## 构造函数

```javascript
new G3D.RotatePerspectiveCamera(scene);
```

### 参数

| 名称  | 类型      | 描述           |
| ----- | --------- | -------------- |
| scene | G3D.Scene | 相机所属的场景 |

## 属性

| 名称   | 类型   | 描述                                       |
| ------ | ------ | ------------------------------------------ |
| radius | Number | 相机所在球面的半径                         |
| alpha  | Number | 相机视线与 X-Z 平面的交角，取值从 0 到 360 |
| beta   | Number | 相机视线与 Y 轴的交角，取值从 -180 to 180  |

## 示例

```javascript
const camera = new G3D.RotatePerspectiveCamera(scene);
camera.alpha = 60;
camera.beta = 45;
camera.radius = 100;
```