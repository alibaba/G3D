# Node

抽象的节点基类，表示可在三维空间中平移、旋转、缩放的物体。

## 属性

| 名称     | 类型                              | 描述                                          |
| -------- | --------------------------------- | --------------------------------------------- |
| id       | Number                            | 节点的 ID                                     |
| position | {x: Number, y: Number, z: Number} | 位置，默认是 {x: 0, y: 0, z: 0}               |
| rotation | {x: Number, y: Number, z: Number} | 欧拉角表示的旋转量，默认是 {x: 0, y: 0, z: 0} |
| scale    | {x: Number, y: Number, z: Number} | 缩放量，默认是 {x: 1, y: 1, z: 1}             |
| parent   | G3D.Node                          | 父节点，默认是 null                           |