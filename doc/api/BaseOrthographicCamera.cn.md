# BaseOrthographicCamera

正射相机，继承自 [BaseCamera](./BaseCamera).

## 构造函数

```javascript
new G3D.BaseOrthographicCamera(scene);
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
| width     | Number | 相机视野宽度，默认为 10         |
| viewRatio | Number | 相机视野宽高比，默认为 1        |

## 示例

```javascript
const camera = new G3D.BaseOrthographicCamera(scene);
camera.near = 0.01;
camera.far = 100;
camera.width = 3;
camera.viewRatio = canvas.width / canvas.height;
```