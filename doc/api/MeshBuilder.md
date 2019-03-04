# MeshBuilder

A collection of useful factory methods, each method in the collection returns a created mesh.

## Properties

### createPlane(scene, width, height)

Create a rectangle mesh on X-Y plane, center is the origin point.

#### Arguments

| name   | type      | description                           |
| ------ | --------- | ------------------------------------- |
| scene  | G3D.Scene | the scene you want to put the mesh in |
| width  | Number    | width along X coordinate              |
| height | Number    | height along Y coordinate             |

#### Returns

| type     | description  |
| -------- | ------------ |
| G3D.Mesh | Created mesh |

### createCircle(scene, radius, segs)

Create a circle mesh on X-Y plane, center is the origin point.

#### Arguments

| name   | type      | description                           |
| ------ | --------- | ------------------------------------- |
| scene  | G3D.Scene | the scene you want to put the mesh in |
| radius | Number    | the circle's radius                   |
| segs   | Number    | the circle segements count            |

#### Returns

| type     | description  |
| -------- | ------------ |
| G3D.Mesh | Created mesh |

### createCube(scene, width, height, depth)

Create a cube, center is the origin point.

#### Arguments

| name   | type      | description                           |
| ------ | --------- | ------------------------------------- |
| scene  | G3D.Scene | the scene you want to put the mesh in |
| width  | Number    | width along X coordinate              |
| height | Number    | height along Y coordinate             |
| depth  | Number    | depth along Z coordinate              |

#### Returns

| type     | description  |
| -------- | ------------ |
| G3D.Mesh | Created mesh |

### createSphere(scene, radius, widthSegs, heightSegs)

Create a sphere, center point is the origin point.

#### Arguments

| name       | type      | description                           |
| ---------- | --------- | ------------------------------------- |
| scene      | G3D.Scene | the scene you want to put the mesh in |
| radius     | Number    | the sphere's radius                   |
| widthSegs  | Number    | width segements count                 |
| heightSegs | Number    | height segements count                |

#### Returns

| type     | description  |
| -------- | ------------ |
| G3D.Mesh | Created mesh |

### createCylinder(scene, radius, height, segs)

Create a cylinder, center is the origin point.

#### Arguments

| name   | type      | description                           |
| ------ | --------- | ------------------------------------- |
| scene  | G3D.Scene | the scene you want to put the mesh in |
| radius | Number    | the cylinder's radius                 |
| height | Number    | the cylinder's height                 |
| segs   | Number    | the circle segements count            |

#### Returns

| type     | description  |
| -------- | ------------ |
| G3D.Mesh | Created mesh |

### createCone(scene, radius, height, segs)

Create a cone, base circle's center is the origin point.

#### Arguments

| name   | type      | description                           |
| ------ | --------- | ------------------------------------- |
| scene  | G3D.Scene | the scene you want to put the mesh in |
| radius | Number    | the cone's radius                     |
| height | Number    | the cone's height                     |
| segs   | Number    | the circle segements count            |

#### Returns

| type     | description  |
| -------- | ------------ |
| G3D.Mesh | Created mesh |

### createCoordinate(scene, size)

Create a coordinate line mesh, X axis is red, Y axis is green, B axis is blue.

#### Arguments

| name  | type      | description                           |
| ----- | --------- | ------------------------------------- |
| scene | G3D.Scene | the scene you want to put the mesh in |
| size  | Number    | the length of each axis               |

#### Returns

| type         | description  |
| ------------ | ------------ |
| G3D.LineMesh | Created mesh |

### createFromObjModel(scene, model)

Create a mesh from obj model data.

#### Arguments

| name  | type                       | description                           |
| ----- | -------------------------- | ------------------------------------- |
| scene | G3D.Scene                  | the scene you want to put the mesh in |
| model | {obj: String, mtl: String} | obj model data                        |

#### Returns

| type     | description  |
| -------- | ------------ |
| G3D.Mesh | Created mesh |

### createFromStlModel(scene, model)

Create a mesh from stl model data.

#### Arguments

| name  | type      | description                           |
| ----- | --------- | ------------------------------------- |
| scene | G3D.Scene | the scene you want to put the mesh in |
| model | String    | stl model data                        |


### createMeshFromGLTF(scene, model, pbrEnviroment)

Create mesh from GLTF model data.

#### Arguments

| name          | type              | description                           |
| ------------- | ----------------- | ------------------------------------- |
| scene         | G3D.Scene         | the scene you want to put the mesh in |
| model         | String            | STL model data                        |
| pbrEnviroment | G3D.PBREnviroment | PBREnviroment object                  |

#### Returns

| type     | description  |
| -------- | ------------ |
| G3D.Mesh | Created mesh |

### createWireFrameFromMesh(scene, mesh)

Create a wireframe line mesh from a mesh.

#### Arguments

| name  | type      | description                           |
| ----- | --------- | ------------------------------------- |
| scene | G3D.Scene | the scene you want to put the mesh in |
| mesh  | G3D.Mesh  | source mesh object                    |

### createLineFromPath(scene, path, resolution)

Create a line mesh from SVGPath.

#### Arguments

| name       | type      | description                           |
| ---------- | --------- | ------------------------------------- |
| scene      | G3D.Scene | the scene you want to put the mesh in |
| path       | String    | SVGPath data                          |
| resolution | Number    | resolution                            |

#### Returns

| type         | description  |
| ------------ | ------------ |
| G3D.LineMesh | Created mesh |

### createMeshFromPath(scene, path, thickness, resolution)

#### Arguments

| name       | type      | description                           |
| ---------- | --------- | ------------------------------------- |
| scene      | G3D.Scene | the scene you want to put the mesh in |
| path       | String    | SVGPath data                          |
| thickness  | Number    | thickness                             |
| resolution | Number    | resolution                            |

#### Returns

| type         | description  |
| ------------ | ------------ |
| G3D.LineMesh | Created mesh |
