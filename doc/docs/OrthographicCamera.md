# OrthographicCamera

Orthographic Camera. Extends from [BaseCamera](./BaseCamera).

## Constructor

```javascript
new G3D.OrthographicCamera(scene);
```

### options

| name  | type      | description                                 |
| ----- | --------- | ------------------------------------------- |
| scene | G3D.Scene | the g3d scene you want to put the camera in |

## Properties

| name      | type   | description                                                |
| --------- | ------ | ---------------------------------------------------------- |
| near      | Number | distance between camera and the near plane, default is 1   |
| far       | Number | distance between camera and the far plane, default is 1000 |
| width     | Number | width of the camera's view                                 |
| viewRatio | Number | view's width / height of the camera                        |

## Methods

There's no public methods for `G3D.OrthographicCamera`.