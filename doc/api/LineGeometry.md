# Geometry

Line geometry.

## Constructor

```javascript
new G3D.LineGeometry(mesh);
```

### Arguments

| name            | type                                    | description         |
| --------------- | --------------------------------------- | ------------------- |
| config          | Object                                  | config object       |
| config.vertices | G3D.BufferView \| Array                 | vertices data       |
| config.indices  | {[key]: G3D.ElementBufferView \| Array} | vertices index data |

## Example

```javascript
const lineGeometry = new G3D.LineGeomtry({
    vertices: [
        0, 0, 1,
        0, 1, 1,
        1, 1, 1
    ],
    indices: {
        foo: [0, 1, 1, 2]
    }
});
```