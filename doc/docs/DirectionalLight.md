# DirectionalLight

The directional light, extends from [Light](./Light).

## Constructor

```javascript
new G3D.DirectionalLight(scene);
```

### options

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

Object.assign(light.color, {r: 255, g: 255, b: 255});

Object.assign(light.direction, {x : 1, y : 1, z : 1});

light.intensity = 0.5;
```