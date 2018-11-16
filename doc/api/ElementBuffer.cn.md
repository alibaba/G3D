# ElementBuffer

顶点索引数据块。

## 构造函数

```javascript
new G3D.ElementBuffer(config);
```

### 参数

| 名称        | 类型                                      | 描述     |
| ----------- | ----------------------------------------- | -------- |
| config      | Object                                    | 配置对象 |
| config.data | UInt32Array \| UInt16Array \| ArrayBuffer | 数据     |

## 示例

```javascript
const buffer = new G3D.ElementBuffer({
    data: new UInt32Array([0, 1, 2, 0, 2, 3])
});
```
