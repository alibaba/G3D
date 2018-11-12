# OrthographicCamera

Orthographic Camera, extends from [BaseCamera](./BaseCamera).

## Constructor

```javascript
new G3D.OrthographicCamera(scene);
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
| width     | Number | width of the camera's view, default is 10                  |
| viewRatio | Number | view's width / height of the camera, default is 1          |

## Example

```javascript
const camera = new G3D.BaseOrthographicCamera(scene);
camera.near = 0.01;
camera.far = 100;
camera.width = 3;
camera.viewRatio = canvas.width / canvas.height;
```