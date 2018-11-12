# BasePerspectiveCamera

透视相机，继承自 [BaseCamera](./BaseCamera).

## 构造函数

```javascript
new G3D.BasePerspectiveCamera(scene);
```

### 参数

| 名称  | 类型      | 描述           |
| ----- | --------- | -------------- |
| scene | G3D.Scene | 相机所属的场景 |

## 属性

| 名称      | 类型   | 描述                            |
| --------- | ------ | ------------------------------- |
| near      | Number | 相机与近切面的距离，默认为 1    |
| far       | Number | 相机与远切面的距离，默认为 1000 |
| fov       | Number | 相机的视场角，默认为60          |
| viewRatio | Number | 相机视野宽高比，默认为 1        |

## 示例

```javascript
const camera = new G3D.BasePerspectiveCamera(scene);
camera.near = 0.01;
camera.far = 100;
camera.fov = 75;
camera.viewRatio = canvas.width / canvas.height;
```