# Scene

场景。

## 构造函数

```javascript
new G3D.Scene(engine);
```

### 参数

| 名称   | 类型       | 描述                    |
| ------ | ---------- | ----------------------- |
| engine | G3D.Engine | 之前创建的 G3D 渲染引擎 |

## 属性

| 名称       | 类型                              | 描述                                       |
| ---------- | --------------------------------- | ------------------------------------------ |
| clearColor | {r: Number, g: Number, b: Number} | 场景的背景色，每个分量取值在 0 到 255 之间 |

## 方法

### render()

渲染整个场景。

### pick(x, y)

尝试点选 3D 场景中的物体。

#### 参数

| 名称 | 类型   | 描述                      |
| ---- | ------ | ------------------------- |
| x    | Number | 在 canvas 上点选的 x 坐标 |
| y    | Number | 在 canvas 上点选的 y 坐标 |

#### 返回值

| 类型           | 描述                                                |
| -------------- | --------------------------------------------------- |
| Number \| null | 被点到的网格体 id，如果为 null 则表示没有点到网格体 |


## 示例

```javascript
const scene = new G3D.Scene(engine);
scene.clearColor = {r: 200, g: 200, b: 200};

function render(){
    scene.render();
    requestAnimationFrame(render);
}
```