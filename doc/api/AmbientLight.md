# AmbientLight

The ambient light, extends from [BaseLight](./BaseLight).

## Constructor

```javascript
new G3D.AmbientLight(scene);
```

### Arguments

| name  | type      | description                            |
| ----- | --------- | -------------------------------------- |
| scene | G3D.Scene | the scene you want to put the light in |

## Example

```javascript
const light = new AmbientLight(scene);
light.color = {r: 255, g: 0, b: 0};
light.intensity = 0.3;
```