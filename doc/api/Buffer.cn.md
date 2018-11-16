# Buffer

数据块。

## 构造函数

```javascript
new G3D.Buffer(config);
```

### 参数

| 名称          | 类型                        | 描述                                                        |
| ------------- | --------------------------- | ----------------------------------------------------------- |
| config        | Object                      | 配置对象                                                    |
| config.data   | Float32Array \| Uint32Array | 数据                                                        |
| config.target | string                      | 数据块类型，可以是 'ARRAY_BUFFER' 或 'ELEMENT_ARRAY_BUFFER' |

## 示例

```javascript
const buffer = new G3D.Buffer({
    data: new Float32Array([
        1, 0, 0, 
        0, 1, 0
    ]),
    target: 'ARRAY_BUFFER'
});
```

