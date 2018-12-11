# Texture

Texture.

## Constructor

```javascript
new G3D.Texture(config);
```

### Arguments

| name          | type    | description                                   |
| ------------- | ------- | --------------------------------------------- |
| config        | Object  | config object                                 |
| config.image  | Image   | texture image                                 |
| config.sRGB   | Boolean | use SRGB mode, default is false               |
| config.flipY  | Boolean | use flipY mode, default is true               |
| config.repeat | Boolean | use repeat mode, default is true              |
| config.mipmap | Boolean | generate mipmaps if possible, default is true |
| config.mip    | Image[] | custom mipmaps, optional                      |

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