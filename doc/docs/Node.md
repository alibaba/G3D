# Node

Base class for Mesh and Camera, representing something transformable in a 3d space.

## Constructor

```javascript
new G3D.Node();
```

### options

There's no options for `Node` constructor.

## Properties

| name     | type                              | description                                                                                     |
| -------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| position | {x: Number, y: Number, z: Number} | position, default is {x: 0, y: 0, z: 0}                                                         |
| rotation | {x: Number, y: Number, z: Number} | position, default is {x: 0, y: 0, z: 0}                                                         |
| scale    | {x: Number, y: Number, z: Number} | scale, default is {x: 1, y: 1, z: 1}                                                            |
| parent   | G3D.Node                          | parent of the node, a Node's position in world will be affected by it's parent, default is null |

## Methods

### transformCoordinate(x, y, z)

Transform a position from node's local coordinate system to world coordinate system.

#### options

| name | type   | description      |
| ---- | ------ | ---------------- |
| x    | Number | position x value |
| y    | Number | position y value |
| z    | Number | position z value |

#### returns

position: {x: Number, y: Number, z: Number}, the transformed position.

### transformNormal(x, y, z)

Transform a direction vector from node's local coordinate system to world coordinate system.

#### options

| name | type   | description      |
| ---- | ------ | ---------------- |
| x    | Number | direction x value |
| y    | Number | direction y value |
| z    | Number | direction z value |

#### returns

direction: {x: Number, y: Number, z: Number}, the transformed direction.