# LineMesh

Line mesh, extends from [BaseMesh](./BaseMesh).

## Constructor

```javascript
new G3D.LineMesh(scene);
```

### Arguments

| name  | type      | description                                |
| ----- | --------- | ------------------------------------------ |
| scene | G3D.Scene | the scene you want to put the line mesh in |

## Properties

| name      | type                  | description             |
| --------- | --------------------- | ----------------------- |
| geometry  | G3D.LineGeometry      | line geomtry object     |
| materials | {[key]: G3D.Material} | collection of materials |
| lineWidth | Number                | line width              |

## Example

```javascript
const mesh = new G3D.LineMesh(scene);
mesh.geomtry = new G3D.LineGeomtry({
    vertices, 
    indices: {
        foo: indices
    }
});
mesh.materials = {
    foo: new G3D.RawMaterial(rawMaterialConfig)
};
```