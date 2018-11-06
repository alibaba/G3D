# Mesh

The Mesh. Extends from Node.

## Constructor

```javascript
new G3D.Mesh(scene);
```

### options

| name  | type      | description                           |
| ----- | --------- | ------------------------------------- |
| scene | G3D.Scene | the scene you want to put the mesh in |

## Properties

| name             | type                  | description                                                                             |
| ---------------- | --------------------- | --------------------------------------------------------------------------------------- |
| geometry         | G3D.Geometry          | the geometry object                                                                     |
| materials        | {[key]: G3D.Material} | the material collection                                                                 |
| visibility       | Boolean               | whether the mesh is visible, default is true                                            |
| pickable         | Boolean               | whether the mesh could be picked using scene.pick(), default is true                    |
| renderLayerIndex | Number                | the render layer index, higher layer covers on those lower layers(no matter the depths) |

## Methods

### dispose()

Remove the mesh from the scene.

#### options

There's no options for the dispose method.

#### returns

Void.

## Examples

```javascript
const mesh = new G3D.Mesh(scene);

mesh.geometry.vertices = [...yourVertices];
mesh.geometry.normals = [...yourNormals];
mesh.geometry.uvs = [...yourUVs];

mesh.indices = {
    foo: [...indicesK1],
    bar: [...indicesK2]
}

mesh.materials.foo.ambientColor = {r: 255, g: 255, b: 0};

mesh.materials.bar.diffuseTexture.image = loadedImageObject;
```