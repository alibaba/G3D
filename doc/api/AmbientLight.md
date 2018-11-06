# AmbientLight

The ambient light, extends from [Light](./Light).

## Constructor

```javascript
new G3D.AmbientLight(scene);
```

### options

| name  | type      | description                            |
| ----- | --------- | -------------------------------------- |
| scene | G3D.Scene | the scene you want to put the light in |

## Examples

```javascript
const light = new AmbientLight(scene);

light.color.r = 255;
light.color.g = 255;
light.color.b = 255;

light.intensity = 0.5;
```