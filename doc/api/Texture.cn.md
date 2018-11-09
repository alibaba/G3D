# Texture

纹理。

## 构造函数

```javascript
new G3D.Texture(config);
```

### 参数

| 名称          | 类型                                | 描述                                                             |
| ------------- | ----------------------------------- | ---------------------------------------------------------------- |
| config        | Object                              | 配置对象                                                         |
| config.image  | Image \| Uint8Array \| Float32Array | 纹理图片或数据                                                   |
| config.width  | Number                              | 纹理的宽度，若纹理是 Image 对象则会使用 image.width，不需要传入  |
| config.height | Number                              | 纹理的高度，若纹理是 Image 对象则会使用 image.height，不需要传入 |
| config.sRGB   | Boolean                             | 使用 SRGB 模式解析，默认为 false                                 |
| config.flipY  | Boolean                             | 转置 Y 坐标存储纹理数据，默认为 true                             |
| config.repeat | Boolean                             | 使用重复模式平铺，默认为 true                                    |

## 示例

```javascript
const imageTexture = new G3D.Texture({
    image: textureImage,
    sRGB: true,
    repeat: true
});

const mannualTexture = new G3D.Texture({
    image: new Float32Array([
        1, 1, 1, 1, 
        1, 0, 0, 1
        0, 1, 0, 1, 
        0, 0, 0, 1
    ]),
    width: 2,
    height: 2,
    sRGB: true,
    repeat: true
});
```