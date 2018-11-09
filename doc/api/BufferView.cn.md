# BufferView

数据视图。

## 构造函数

```javascript
new BufferView(config);
```

### 参数

| 名称          | 类型       | 描述                                     |
| ------------- | ---------- | ---------------------------------------- |
| config        | Object     | 配置数据                                 |
| config.buffer | G3D.Buffer | 数据源                                   |
| config.stride | Number     | 视图数据在数据块中的间隔，默认为 0       |
| config.offset | Number     | 视图数据再数据块中的初始偏移量，默认为 0 |

## 示例

```javascript
const bufferView = new G3D.BufferView({
    buffer: new Buffer({
        data: new Float32Array([
            0, 1, 2, 3, 4, 5, 6, 7
        ]),
        target: 'ARRAY_BUFFER'
    }),
    stride: 3,
    offset: 1
});
```