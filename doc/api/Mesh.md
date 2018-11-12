# Mesh

Face Mesh, extends from [BaseMesh](./BaseMesh).

## Constructor

```javascript
new G3D.Mesh(scene);
```

### Arguments

| name  | type      | description                           |
| ----- | --------- | ------------------------------------- |
| scene | G3D.Scene | the scene you want to put the mesh in |

## Properties

| name      | type                  | description             |
| --------- | --------------------- | ----------------------- |
| geometry  | G3D.Geometry          | the geometry object     |
| materials | {[key]: G3D.Material} | the material collection |

## Example

```javascript
const mesh = new G3D.Mesh(scene);
mesh.geomtry = new G3D.Geomtry({
    vertices, 
    normals,
    uvs,
    indices: {
        foo: indices1,
        bar: indices2
    }
});
mesh.materials = {
    foo: new G3D.RawMaterial(rawMaterialConfig),
    bar: new G3D.PhongMaterial(phongMaterialConfig)
};
```