# HemisphereLight

The hemisphereLight light, extends from [Light](./Light).

## Constructor

```javascript
new G3D.HemisphereLight(scene);
```

### options

| name  | type      | description                            |
| ----- | --------- | -------------------------------------- |
| scene | G3D.Scene | the scene you want to put the light in |

## Properties

| name   | type                              | description                                                              |
| ------ | --------------------------------- | ------------------------------------------------------------------------ |
| sky    | {r: Number, g: Number, b: Number} | Sky light color, default is {r: 255, g: 255, b: 255}                     |
| ground | {r: Number, g: Number, b: Number} | Ground light color, default is { r: 0, g: 0, b: 0 }                      |
| up     | {x: Number, y: Number, z: Number} | the up direction of the hemisphere light,  default is {x: 0, y: 1, z: 0} |

## Examples

```javascript
const light = new HemisphereLIght(scene);

Object.assign(light.sky, {r: 200, g: 200, b: 200});
Object.assign(light.sky, {r: 100, g: 100, b: 100});

light.intensity = 1.0;
```