# Create Mesh

We can create mesh through 3 ways. 

1. Create predefined shaped mesh.
2. Create custom mesh, mannually specify vertices, normals and so on.
3. Create mesh from 3d model file.

Let's walk throught one by one.

## Create predefined shaped mesh.

Last chapter we created a cube-shape mesh. Actually G3D allows us to create a number of shapes: Sphere, Cylinder, Cone, Plane(ground).

See the following case:

<iframe class="playground" src="https://gplatformteam.github.io/g3d-playground/docs/?embed#item=shapes"></iframe>

We created a sphere mesh by callding `G3D.MeshBuilder.createSphere`. The first argument is the `scene` object, the second is sphere's radius. There's two optional arguments (the third and the fourth one), widthSegs and heightSegs, which decides how much vertices the mesh should have. Larger the number, smoother the curve of the mesh will be.

```javascript
mesh = G3D.MeshBuilder.createSphere(scene, 1);
```

Basiclly, the `MeshBuider.createXXX` methods follow this pattern:

* First argument should be your scene object.
* Following is one or more arguments representing the size of the mesh.
* Last is one or more arguments is the curve's segments number.

Read the [API Reference](../docs/MeshBuilder) for more information.

Try uncomment one of these lines and comment other lines, to see what kind of mesh it will create.

```javascript
    mesh = G3D.MeshBuilder.createSphere(scene, 1);
    // mesh = G3D.MeshBuilder.createGround(scene, 2, 1);
    // mesh = G3D.MeshBuilder.createCylinder(scene, 1, 1);
    // mesh = G3D.MeshBuilder.createCone(scene, 1, 1);
    // mesh = G3D.MeshBuilder.createCube(scene, 1);
```

## Create Custom Mesh

You can also create custom mesh by mannually specify the mesh's geometry vertices, normals and so on.

See the following example:

<iframe class="playground" src="https://gplatformteam.github.io/g3d-playground/docs/?embed#item=custom-geometry"></iframe>

In `createCustomTriangleMesh` method, we call `new G3D.Mesh` to create an empty mesh.

```javascript
const mesh = new G3D.Mesh(scene);
```

We got a mesh instance, which structure is:

* mesh: instance of `G3D.Mesh`
    * geometry: instance of `G3D.Geometry`
        * vertices: array of `Number`, default is empty (`[]`)
        * normals: array of `Number`, default is empty
        * uvs: array of `Number`
        * indices: object
            * default: array of `Number`, default is empty. `default` is a default name, which maps the material with the same name in `materials`. A mesh may has multiple indices arrays and materials. For example, `mesh.geometry.indices.default` maps with `mesh.materials.default`, also `mesh.geometry.indices.foo` maps with `mesh.materials.foo`.
    * materials: object
        * default: instance of `G3D.StandardMaterial`, maps with indices array with the same name `default` in `geometry.indices` (`geometry.indices.default`, ie). More details in material instance will be discussed in later chapters.

If we want to create a custom mesh, we need to manually fill `geometry.vertices`, `geometry.normals`, `geometry.uvs`, `geometry.indice.default`, as following:

```javascript
mesh.geometry.vertices = [
    2, 0, 0,
    0, 2, 0,
    0, 0, 2
];
mesh.geometry.uvs = [0, 0, 0, 0, 0, 0];
mesh.geometry.normals = [
    1, 1, 1,
    1, 1, 1,
    1, 1, 1
];
mesh.geometry.indices = {
    foo: [
        0, 1, 2
    ]
};
```

* Each 3 numbers in `vertices` array represents a vertice's position (x, y, z). Here we have 3 vertices, the one which coordinate is (2, 0, 0) is on the X axis, and the other two are on Y axis and Z axis.
* Each 2 numbers in `uvs` array represents a vertice's uv, which is useful when we apply texture on the mesh. Cause we don't use texture for the example, we just specify [0, 0] for each vertices.
* Each 3 numbers in `normals` array represents a vertice's normal vector. Because the 3 vertices are in the same face (see indices following).
* Each 3 numbers in `indices.{xxx}` (such as `indices.default`) represents a face, each number is the index of the vertices, for example, the first item number `0` in `indices.foo` represents vertice (2, 0, 0) in vertices array.

You can change the numbers in those arrays and verify the above explaination.

## Create From 3D Model Files

When your 3D project grows larger, you should consider creating 3D models using applications such as Blender, 3D Max, SketchUp and so on. Most 3D modeling applications share some common model file format, G3D can load two of them: obj and stl (currently).

See the following example, check how to use G3D to load obj format 3D model files.

<iframe class="playground" src="https://gplatformteam.github.io/g3d-playground/docs/?embed#item=create-from-model"></iframe>

As we mentioned above, G3D is a pure render engine and the 'load' thing is related to the environment (the way to load text from internet is different from in browser to in hybrid envronments), you should deal with the 'load' thing yourself, and pass the loaded text to `MeshBuilder.createFromObjModel`.

```javascript
const objStr = `
    # Alias OBJ Model File
    # File units = meters
    mtllib triangle.mtl
    usemtl FrontColor
    v 0 0 1
    vt -27.8388 -16.0728
    vn -0.57735 -0.57735 0.57735
    v 1 0 0
    vt 27.8388 -16.0728
    v 0 1 0
    vt 0 32.1455
    f 1/1/1 2/2/1 3/3/1
`;

const mtlStr = `
    # Alias OBJ Material File
    newmtl FrontColor
    Ka 0.000000 0.000000 0.000000
    Kd 0.882353 0.882353 0.784314
    Ks 0.330000 0.330000 0.330000
`;

return G3D.MeshBuilder.createFromObjModel(scene, { obj: objStr, mtl: mtlStr });
```

An obj-formatted model usually contains a *.obj file and a *.mtl file. You should load it yourself. Here we hard coded a simple model (a triangle just like the one in the previous example).

For more information about obj format, you can refer to [Obj Spec](http://www.martinreddy.net/gfx/3d/OBJ.spec). And try change the hard coded string to see what happened.