# BaseCamera

相机基类，继承自 [Node](./Node)。

## 构造函数

```javascript
new G3D.BaseCamera(scene);
```

### 参数

| 名称  | 类型      | 描述           |
| ----- | --------- | -------------- |
| scene | G3D.Scene | 相机所属的场景 |

## 属性

| 名称   | 类型                              | 描述                                         |
| ------ | --------------------------------- | -------------------------------------------- |
| center | {x: Number, y: Number, z: Number} | 相机镜头对准的位置，默认是{x: 0, y: 0, z: 0} |
| up     | {x: Number, y: Number, z: Number} | 相机的上方向，默认是{x: 0, y: 1, z: 0}       |