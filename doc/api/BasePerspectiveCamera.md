# BasePerspectiveCamera

Base perspective camera, extends from [BaseCamera](./BaseCamera).

## Constructor

```javascript
new G3D.PerspectiveCamera(scene);
```

### Arguments

| name  | type      | description                                 |
| ----- | --------- | ------------------------------------------- |
| scene | G3D.Scene | the g3d scene you want to put the camera in |

## Properties

| name      | type   | description                                                |
| --------- | ------ | ---------------------------------------------------------- |
| near      | Number | distance between camera and the near plane, default is 1   |
| far       | Number | distance between camera and the far plane, default is 1000 |
| fov       | Number | field of view, default is 60                               |
| viewRatio | Number | view's width / height, default is 1                        |

## Example

```javascript
const camera = new G3D.BasePerspectiveCamera(scene);
camera.near = 0.01;
camera.far = 100;
camera.fov = 75;
camera.viewRatio = canvas.width / canvas.height;
```