# Skybox

The sky box in 3D scene.

## Constructor

```javascript
new G3D.Skybox(scene, images, size);
```

### Arguments

| name   | type      | description                                                               |
| ------ | --------- | ------------------------------------------------------------------------- |
| scene  | G3D.Scene | the g3d scene you want to put the camera in                               |
| images | Object    | 6 images with specify the front / back / top / bottom / left / right side |
| size   | Number    | size of skybox                                                            |

## Methods

There's no public methods for `Skybox`.

## Example

```javascript
const skybox = new G3D.Skybox(scene, {
    front: frontImage,
    back: backImage,
    top: topImage,
    bottom: bottomImage,
    left: leftImage,
    right: rightImage
}, 200);
```