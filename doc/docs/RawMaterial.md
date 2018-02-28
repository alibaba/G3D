# RawMaterial

Raw material, whose rendered color is independent from lights. Extends from [Material](./Material).

## Constructor

```javascript
new G3D.RawMaterial(mesh);
```

| name | type     | description                 |
| ---- | -------- | --------------------------- |
| mesh | G3D.Mesh | the mesh the material is on |

## Properties

| name    | type                                    | description                             |
| ------- | --------------------------------------- | --------------------------------------- |
| color   | {r: Number, g: Number, b: Number}       | ambient color                           |
| texture | G3D.Texture                             | ambient texture                         |
| source  | enum {Material.COLOR, Material.TEXTURE} | whether to use ambient color or texture |