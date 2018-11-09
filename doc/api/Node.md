# Node

Base class for Mesh and Camera, representing something transformable in a 3d space.

## Constructor

```javascript
new G3D.Node();
```

### options

There's no options for `Node` constructor.

## Properties

| name     | type                              | description                                             |
| -------- | --------------------------------- | ------------------------------------------------------- |
| position | {x: Number, y: Number, z: Number} | position, default is {x: 0, y: 0, z: 0}                 |
| rotation | {x: Number, y: Number, z: Number} | rotation in euler angles, default is {x: 0, y: 0, z: 0} |
| scale    | {x: Number, y: Number, z: Number} | scale, default is {x: 1, y: 1, z: 1}                    |
| parent   | G3D.Node                          | parent of the node, default is null                     |

## Methods


### getMatrix()

Get the transform

Transform a direction vector from node's local coordinate system to world coordinate system.

#### arguments

There's no options for ``

#### returns

matrix: Float32Array, the transform matrix.