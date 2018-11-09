# CubeTexture

立方体纹理

## 构造函数

```javascript
new G3D.CubeTexture(config)
```

### 参数

| 名称                | 类型    | 描述                                                                                        |
| ------------------- | ------- | ------------------------------------------------------------------------------------------- |
| config              | Object  | 配置对象                                                                                    |
| config.images       | Object  | 立方体纹理集合                                                                              |
| config.images[face] | Image   | 立方体纹理指定方向的问题图片，face 可以是 `front`，`back`，`top`，`bottom`，`left`，`right` |
| config.sRGB         | Boolean | 使用 SRGB 模式解析，默认为 false                                                            |
| config.flipY        | Boolean | 转置 Y 坐标存储纹理数据，默认为 true                                                        |

## 示例

```javascript
const cubeTexture = new G3D.CubeTexture({
    images: {
        front: frImage,
        back: bkImage,
        top: tpImage,
        bottom: btImage,
        left: lfImage,
        right: rtImage
    },
    sRGB: true,
    flipY: false
})
```