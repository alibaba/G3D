# Texture

Texture.

## Constructor

```javascript
new G3D.Texture(config);
```

### Arguments

| name          | type                                | description                                               |
| ------------- | ----------------------------------- | --------------------------------------------------------- |
| config        | Object                              | config object                                             |
| config.image  | Image \| Uint8Array \| Float32Array | texture image or data                                     |
| config.width  | Number                              | texture width, if data is Image it would be image.width   |
| config.height | Number                              | texture height, if data is Image it would be image.height |
| config.sRGB   | Boolean                             | use SRGB mode, default is false                           |
| config.flipY  | Boolean                             | use flipY mode, default is true                           |
| config.repeat | Boolean                             | use repeat mode, default is true                          |

## Example

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