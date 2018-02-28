# PointLight

The point light, extends from [Light](./Light).

## Constructor

```javascript
new G3D.PointLight(scene);
```

### options

| name  | type      | description                            |
| ----- | --------- | -------------------------------------- |
| scene | G3D.Scene | the scene you want to put the light in |

## Properties

| name     | type                              | description                                         |
| -------- | --------------------------------- | --------------------------------------------------- |
| position | {x: Number, y: Number, z: Number} | point light position, default is {x: 0, y: 0, z: 0} |
| radius   | Number                            | the point light's standard radius, default is 1     |

## Examples

```javascript
const light = new PointLight(scene);

Object.assign(light.color, {r: 255, g: 255, b: 255});

Object.assign(light.position, {x : 3, y : 4, z : 0});

light.radius = 5;

light.intensity = 0.3; // the origin point's intensity will be exactly 0.3
```