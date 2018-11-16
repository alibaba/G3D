# ElementBufferView

索引数据视图。

## 构造函数

```javascript
new ElementBufferView(config);
```

### 参数

| 名称              | 类型              | 描述                                    |
| ----------------- | ----------------- | --------------------------------------- |
| config            | Object            | 配置对象                                |
| config.buffer     | G3D.ElementBuffer | 数据源                                  |
| config.mode       | String            | 绘图模式，可以为 `TRIANGLES` 或 `LINES` |
| config.count      | Number            | 被索引的顶点数量                        |
| config.byteOffset | Number            | 偏移量                                  |

## 示例

```javascript
const eleBufferView = new G3D.ElementBufferView({
    buffer: new G3D.ElementBuffer({
        data: new UInt32Array([0, 1, 2, 1, 2, 3])
    }),
    count: 6,
    offset: 0,
    mode: 'TRIANGLES'
});
```
