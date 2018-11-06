# MeshBuilder

A collection of useful factory methods. Every method in the collection returns a created mesh.

## Properties

### createGround(scene, width, height)

Create a rectangle on X-Y plane.

#### options

| name   | type      | description                           |
| ------ | --------- | ------------------------------------- |
| scene  | G3D.Scene | the scene you want to put the mesh in |
| width  | Number    | ground width along X coordinate       |
| height | Number    | ground height along Y coordinate      |

### createCube(scene, width, height)

Create a box.

#### options

| name   | type      | description                           |
| ------ | --------- | ------------------------------------- |
| scene  | G3D.Scene | the scene you want to put the mesh in |
| width  | Number    | box width along X coordinate          |
| height | Number    | box height along Y coordinate         |
| depth  | Number    | box depth along Y coordinate          |

### createSphere(scene, radius, widthSegs, heightSegs)

Create a sphere.

#### options

| name       | type      | description                           |
| ---------- | --------- | ------------------------------------- |
| scene      | G3D.Scene | the scene you want to put the mesh in |
| radius     | Number    | the sphere's radius                   |
| widthSegs  | Number    | width segements count                 |
| heightSegs | Number    | height segements count                |

### createCylinder(scene, radius, height, segs)

Create a cylinder.

#### options

| name   | type      | description                           |
| ------ | --------- | ------------------------------------- |
| scene  | G3D.Scene | the scene you want to put the mesh in |
| radius | Number    | the cylinder's radius                 |
| height | Number    | the cylinder's height                 |
| segs   | Number    | the circle segements count            |

### createCone(scene, radius, height, segs)

Create a cone.

#### options

| name   | type      | description                           |
| ------ | --------- | ------------------------------------- |
| scene  | G3D.Scene | the scene you want to put the mesh in |
| radius | Number    | the cone's radius                     |
| height | Number    | the cone's height                     |
| segs   | Number    | the circle segements count            |

### createCoordinate(scene, size)

Create a coordinate, X axis red, Y axis green, B asix blue.

#### options

| name  | type      | description                           |
| ----- | --------- | ------------------------------------- |
| scene | G3D.Scene | the scene you want to put the mesh in |
| size  | Number    | the length of each axis               |

### createFromObjModel(scene, model)

Create a mesh from obj model.

#### options

| name  | type                       | description                           |
| ----- | -------------------------- | ------------------------------------- |
| scene | G3D.Scene                  | the scene you want to put the mesh in |
| model | {obj: String, mtl: String} | obj model data                        |

### createFromStlModel(scene, model)

Create a mesh from stl model.

#### options

| name  | type      | description                           |
| ----- | --------- | ------------------------------------- |
| scene | G3D.Scene | the scene you want to put the mesh in |
| model | String    | stl model data                        |

### createWireFrameFromMesh(scene, mesh)

Create a wireframe line mesh from a mesh.

#### options

| name  | type      | description                           |
| ----- | --------- | ------------------------------------- |
| scene | G3D.Scene | the scene you want to put the mesh in |
| mesh  | G3D.Mesh  | source mesh object                    |

### createBoundingBoxFromMesh(scene, mesh)

Create a bounding box mesh from a mesh.

#### options

| name  | type      | description                           |
| ----- | --------- | ------------------------------------- |
| scene | G3D.Scene | the scene you want to put the mesh in |
| mesh  | G3D.Mesh  | source mesh object                    |
