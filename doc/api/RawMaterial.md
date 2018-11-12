# RawMaterial

Raw material, the rendered color is independent from lights, extends from [Material](./Material).

## Constructor

```javascript
new G3D.RawMaterial();
```

## Properties

| name    | type                              | description     |
| ------- | --------------------------------- | --------------- |
| color   | {r: Number, g: Number, b: Number} | ambient color   |
| texture | G3D.Texture                       | ambient texture |

## Example

```javascript
const material = new G3D.RawMaterial();
material.color = {r: 100, g: 100, b: 200};
material.texture = new G3D.Texture(textureConfig);

mesh.materials['default'] = material;
```