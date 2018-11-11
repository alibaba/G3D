# DirectionalLight

Directional light, extends from [Light](./Light).

## Constructor

```javascript
new G3D.DirectionalLight(scene);
```

### Arguments

| name  | type      | description                            |
| ----- | --------- | -------------------------------------- |
| scene | G3D.Scene | the scene you want to put the light in |

## Properties

| name      | type                              | description                                                                 |
| --------- | --------------------------------- | --------------------------------------------------------------------------- |
| direction | {x: Number, y: Number, z: Number} | light direction from origin to light source, default is {x: 0, y: 0, z: -1} |

## Examples

```javascript
const light = new DirectionalLight(scene);
light.color = {r: 255, g: 0, b: 0};
light.direction = {x : 1, y : 1, z : 1};
light.intensity = 1.5;
```