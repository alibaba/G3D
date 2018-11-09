# Geometry

面状几何体。

## 构造函数

```javascript
new Geometry(config);
```

### 参数

| 名称                | 类型                                    | 描述                                                   |
| ------------------- | --------------------------------------- | ------------------------------------------------------ |
| config              | Object                                  | 配置对象                                               |
| config.vertices     | G3D.BufferView \| Array                 | 顶点数据                                               |
| config.normals      | G3D.BufferView \| Array                 | 法线数据                                               |
| config.uvs          | G3D.BufferView \| Array                 | UV 数据                                                |
| config.indices      | {[key]: G3D.ElementBufferView \| Array} | 顶点索引数据                                           |
| config.mergeNormals | Boolean                                 | 是否合并法线                                           |
| config.facing       | Enum                                    | 可为 Geometry.Facing.FRONT，Facing.BACK 或 Facing.BOTH |

## 示例

```javascript
const geometry = new G3D.Geometry({
    vertices: [
        1, 0, 0, 
        0, 1, 0, 
        0, 0, 1
    ],
    normals: [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1
    ],
    uvs: [
        0, 0,
        1, 0,
        1, 1
    ],
    indices: {
        foo: [0, 1, 2]
    },
    facing: Geometry.BOTH
})
```