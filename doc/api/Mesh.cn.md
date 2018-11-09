# Mesh

面状网格体，继承自 [BaseMesh](./BaseMesh)。

## 构造函数

```javascript
new G3D.Mesh(scene);
```

### 参数

| 名称  | 类型      | 描述             |
| ----- | --------- | ---------------- |
| scene | G3D.Scene | 网格体所属的场景 |

## 属性

| 名称      | 类型                  | 描述       |
| --------- | --------------------- | ---------- |
| geometry  | G3D.Geometry          | 几何体对象 |
| materials | {[key]: G3D.Material} | 材质集合   |

## 示例

```javascript
const mesh = new G3D.Mesh(scene);
mesh.geomtry = new G3D.Geomtry({
    vertices, 
    normals,
    uvs,
    indices: {
        foo: indices1,
        bar: indices2
    }
});
mesh.materials = {
    foo: new G3D.RawMaterial(rawMaterialConfig),
    bar: new G3D.PhongMaterial(phongMaterialConfig)
};
```