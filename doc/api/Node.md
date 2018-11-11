# Node

Base node clas, representing something transformable(translate, rotate, scale) in a 3d space.


## Properties

| name     | type                              | description                                             |
| -------- | --------------------------------- | ------------------------------------------------------- |
| id       | Number                            | node's id                                               |
| position | {x: Number, y: Number, z: Number} | position, default is {x: 0, y: 0, z: 0}                 |
| rotation | {x: Number, y: Number, z: Number} | rotation in euler angles, default is {x: 0, y: 0, z: 0} |
| scale    | {x: Number, y: Number, z: Number} | scale, default is {x: 1, y: 1, z: 1}                    |
| parent   | G3D.Node                          | parent of the node, default is null                     |
