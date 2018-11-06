# Skybox

The sky box in 3D scene.

## Constructor

```javascript
new G3D.Skybox(scene, images, size);
```

### options

| name   | type      | description                                                               |
| ------ | --------- | ------------------------------------------------------------------------- |
| scene  | G3D.Scene | the g3d scene you want to put the camera in                               |
| images | Object    | 6 images with specify the front / back / top / bottom / left / right side |
| size   | Number    | size of skybox                                                            |

## Methods

There's no public methods for `Skybox`.

## Examples

```javascript
const engine = new G3D.Engine(canvas);
const scene = new G3D.Scene(engine);

const camera = new G3D.RotatePerspectiveCamera(scene);

const skybox = new G3D.Skybox(scene, {
    front: frontImage,
    back: backImage,
    ...
});

scene.render();
```