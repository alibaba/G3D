# Texture

纹理。

## 构造函数

```javascript
new G3D.Texture(config);
```

### 参数

| 名称          | 类型    | 描述                                 |
| ------------- | ------- | ------------------------------------ |
| config        | Object  | 配置对象                             |
| config.image  | Image   | 纹理图片                             |
| config.sRGB   | Boolean | 使用 SRGB 模式解析，默认为 false     |
| config.flipY  | Boolean | 转置 Y 坐标存储纹理数据，默认为 true |
| config.repeat | Boolean | 使用重复模式平铺，默认为 true        |
| config.mipmap | Boolean | 是否尝试生成 Mipmap，默认为 true     |
| config.mip    | Image[] | 自定义 mipmap 纹理，可选参数         |

## 示例

```javascript
const imageTexture = new G3D.Texture({
    image: textureImage,
    sRGB: true,
    repeat: true
});
```