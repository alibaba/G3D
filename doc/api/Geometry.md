# Geometry

Face geometry.

## Constructor

```javascript
new Geometry(config);
```

### Arguments

| name                | type                                    | description                                              |
| ------------------- | --------------------------------------- | -------------------------------------------------------- |
| config              | Object                                  | config object                                            |
| config.vertices     | G3D.BufferView \| Array                 | vertices data                                            |
| config.normals      | G3D.BufferView \| Array                 | normal data                                              |
| config.uvs          | G3D.BufferView \| Array                 | uv data                                                  |
| config.indices      | {[key]: G3D.ElementBufferView \| Array} | vertices index data                                      |v
| config.mergeNormals | Boolean                                 | whether to merge normals                                 |
| config.facing       | Enum                                    | can be Geometry.Facing.FRONT，Facing.BACK 或 Facing.BOTH |

## Example

```javascript
const geometry = new G3D.Geometry({
    vertices: [
        1, 0, 0, 
        0, 1, 0, 
        0, 0, 1
    ],
    normals: [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1
    ],
    uvs: [
        0, 0,
        1, 0,
        1, 1
    ],
    indices: {
        foo: [0, 1, 2]
    },
    facing: G3D.Geometry.FACING.BOTH
})
```