# CubeTexture

Cube texture.

## Constructor

```javascript
new G3D.CubeTexture(config)
```

### Arguments

| name                | type    | description                                                                                             |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| config              | Object  | config object                                                                                           |
| config.images       | Object  | image collection of cube textures                                                                       |
| config.images[face] | Image   | single texture image of a specified face, face can be `front`，`back`，`top`，`bottom`，`left`，`right` |
| config.sRGB         | Boolean | use SRGB mode, default is false                                                                         |
| config.flipY        | Boolean | use flipY mode, default is false                                                                         |

## Example

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