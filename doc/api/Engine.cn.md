# Engine

渲染引擎。

## 构造函数

```javascript
new G3D.Engine(canvas);
```

### 参数

| 名称   | 类型                              | 描述                       |
| ------ | --------------------------------- | -------------------------- |
| canvas | HTMLCanvasElement 或 GCanvas 实例 | 显示渲染结果的 canvas 对象 |

## 示例

```javascript
const engine = new G3D.Engine(canvas);
const scene = new G3D.Scene(engine);
```