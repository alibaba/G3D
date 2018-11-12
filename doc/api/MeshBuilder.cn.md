# MeshBuilder

通过不同方式创建各种网格体的工厂函数集合。每一个方法返回一个创建好的网格体。

## 属性

### createPlane(scene, width, height)

创建一个位于 X-Y 平面上，中心为原点的矩形平面。

#### 参数

| 名称   | 类型      | 描述                |
| ------ | --------- | ------------------- |
| scene  | G3D.Scene | 网格体所属的场景    |
| width  | Number    | 宽度，沿 X 轴的距离 |
| height | Number    | 高度，沿 Y 轴的距离 |

#### 返回值

| 类型     | 描述               |
| -------- | ------------------ |
| G3D.Mesh | 创建出的网格体对象 |

### createCube(scene, width, height, depth)

创建一个中心为原点的立方体。

#### 参数

| 名称   | 类型      | 描述                |
| ------ | --------- | ------------------- |
| scene  | G3D.Scene | 网格体所属的场景    |
| width  | Number    | 宽度，沿 X 轴的距离 |
| height | Number    | 高度，沿 Y 轴的距离 |
| depth  | Number    | 深度，沿 Z 轴的距离 |

#### 返回值

| 类型     | 描述               |
| -------- | ------------------ |
| G3D.Mesh | 创建出的网格体对象 |

### createSphere(scene, radius, widthSegs, heightSegs)

创建一个中心为原点的球体。

#### 参数

| 名称       | 类型      | 描述                          |
| ---------- | --------- | ----------------------------- |
| scene      | G3D.Scene | 网格体所属的场景              |
| radius     | Number    | 半径                          |
| widthSegs  | Number    | 纬线方向的顶点密度，默认为 16 |
| heightSegs | Number    | 经线方向的顶点密度，默认为 12 |

#### 返回值

| 类型     | 描述               |
| -------- | ------------------ |
| G3D.Mesh | 创建出的网格体对象 |

### createCylinder(scene, radius, height, segs)

创建一个顶底面平行于 X-Z 平面，中心在原点的圆柱体。

#### 参数

| 名称   | 类型      | 描述             |
| ------ | --------- | ---------------- |
| scene  | G3D.Scene | 网格体所属的场景 |
| radius | Number    | 顶底面的半径     |
| height | Number    | 高度             |
| segs   | Number    | 顶底面的顶点密度 |

#### 返回值

| 类型     | 描述               |
| -------- | ------------------ |
| G3D.Mesh | 创建出的网格体对象 |

### createCone(scene, radius, height, segs)

创建一个底面在 X-Z 平面，底面中心在原点的圆锥体。

#### 参数

| 名称   | 类型      | 描述             |
| ------ | --------- | ---------------- |
| scene  | G3D.Scene | 网格体所属的场景 |
| radius | Number    | 底面的半径       |
| height | Number    | 高度             |
| segs   | Number    | 底面的顶点密度   |

#### 返回值

| 类型     | 描述               |
| -------- | ------------------ |
| G3D.Mesh | 创建出的网格体对象 |

### createCoordinate(scene, size)

创建一个坐标轴形状的线状网格体，X 轴呈红色，Y 轴呈绿色，Z 轴呈蓝色。

#### 参数

| 名称  | 类型      | 描述               |
| ----- | --------- | ------------------ |
| scene | G3D.Scene | 网格体所属的场景 |
| size  | Number    | 每个轴的长度       |

#### 返回值

| 类型         | 描述               |
| ------------ | ------------------ |
| G3D.LineMesh | 创建出的网格体对象 |

### createFromObjModel(scene, model)

从 OBJ 格式的模型数据创建网格体。

#### 参数

| 名称  | 类型                       | 描述               |
| ----- | -------------------------- | ------------------ |
| scene | G3D.Scene                  | 网格体所属的场景 |
| model | {obj: String, mtl: String} | OBJ 模型数据       |

#### 返回值

| 类型     | 描述               |
| -------- | ------------------ |
| G3D.Mesh | 创建出的网格体对象 |

### createFromStlModel(scene, model)

从 STL 格式的模型数据创建网格体。

#### 参数

| 名称  | 类型      | 描述               |
| ----- | --------- | ------------------ |
| scene | G3D.Scene | 网格体所属的场景 |
| model | String    | STL 模型数据       |

#### 返回值

| 类型     | 描述               |
| -------- | ------------------ |
| G3D.Mesh | 创建出的网格体对象 |

### createMeshFromGLTF(scene, model, pbrEnviroment)

从 GLTF 格式的模型数据创建网格体。

#### 参数

| 名称          | 类型              | 描述               |
| ------------- | ----------------- | ------------------ |
| scene         | G3D.Scene         | 网格体所属的场景 |
| model         | String            | STL 模型数据       |
| pbrEnviroment | G3D.PBREnviroment | PBR 环境对象       |

#### 返回值

| 类型     | 描述               |
| -------- | ------------------ |
| G3D.Mesh | 创建出的网格体对象 |

### createLineFromPath(scene, path, resolution)

通过 SVGPath 创建线型网格体。

#### 参数

| 名称       | 类型      | 描述               |
| ---------- | --------- | ------------------ |
| scene      | G3D.Scene | 网格体所属的场景 |
| path       | String    | SVGPath 数据       |
| resolution | Number    | 分辨率             |

#### 返回值

| 类型             | 描述               |
| ---------------- | ------------------ |
| G3D.LineMesh | 创建出的网格体对象 |

### createMeshFromPath(scene, path, thickness, resolution)

通过 SVGPath 创建面型网格体。

#### 参数

| 名称       | 类型      | 描述               |
| ---------- | --------- | ------------------ |
| scene      | G3D.Scene | 网格体所属的场景 |
| path       | String    | SVGPath 数据       |
| thickness  | Number    | 厚度               |
| resolution | Number    | 分辨率             |

#### 返回值

| 类型     | 描述               |
| -------- | ------------------ |
| G3D.Mesh | 创建出的网格体对象 |