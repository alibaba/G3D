# LineGeometry

线型几何体。

## 构造函数

```
new LineGeometry(config);
```

### 参数

| 名称            | 类型                                    | 描述         |
| --------------- | --------------------------------------- | ------------ |
| config          | Object                                  | 配置对象     |
| config.vertices | G3D.BufferView \| Array                 | 顶点数据     |
| config.indices  | {[key]: G3D.ElementBufferView \| Array} | 顶点索引数据 |

## 示例

```javascript
const lineGeometry = new G3D.LineGeomtry({
    vertices: [
        0, 0, 1,
        0, 1, 1,
        1, 1, 1
    ],
    indices: {
        foo: [0, 1, 1, 2]
    }
});
```