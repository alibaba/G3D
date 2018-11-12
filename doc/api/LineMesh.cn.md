# LineMesh

线型网格体，继承自 [BaseMesh](./BaseMesh)。

## 构造函数

```javascript
new G3D.LineMesh(scene);
```

### 参数

| 名称  | 类型      | 描述             |
| ----- | --------- | ---------------- |
| scene | G3D.Scene | 网格体所属的场景 |

## 属性

| 名称      | 类型                  | 描述       |
| --------- | --------------------- | ---------- |
| geometry  | G3D.LineGeometry      | 几何体对象 |
| materials | {[key]: G3D.Material} | 材质集合   |
| lineWidth | Number                | 线的宽度   |

## 示例

```javascript
const mesh = new G3D.LineMesh(scene);
mesh.geomtry = new G3D.LineGeomtry({
    vertices, 
    indices: {
        foo: indices
    }
});
mesh.materials = {
    foo: new G3D.RawMaterial(rawMaterialConfig)
};
```