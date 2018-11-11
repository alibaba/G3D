# PointLight

The point light, extends from [Light](./Light).

## Constructor

```javascript
new G3D.PointLight(scene);
```

### Arguments

| name  | type      | description                            |
| ----- | --------- | -------------------------------------- |
| scene | G3D.Scene | the scene you want to put the light in |

## Properties

| name          | type                              | description                                         |
| ------------- | --------------------------------- | --------------------------------------------------- |
| position      | {x: Number, y: Number, z: Number} | point light position, default is {x: 0, y: 0, z: 0} |
| radius        | Number                            | the point light's standard radius, default is 1     |
| castShadow    | boolean                           | whether to cast shadow, default is false            |
| castShadowFov | Number                            | shadow fov, default is 60                           |

## Example

```javascript
const light = new PointLight(scene);
light.color = {r: 255, g: 0, b: 0};
light.position = {x : 3, y : 4, z : 0};
light.radius = 5;
```