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
| config.data   | Float32Array \| ArrayBuffer | 数据                                                        |

## 示例

```javascript
const buffer = new G3D.Buffer({
    data: new Float32Array([
        1, 0, 0, 
        0, 1, 0
    ])
});
```

