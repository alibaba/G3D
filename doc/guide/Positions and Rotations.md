# Positions and Rotations

A basic issue of objects in 3D scene is: where are they positioned ? When a mesh is created, it is position at the origin point (0, 0, 0) by default. If you want to put it somewhere else, you need to specify it's position (and rotation, scale).

`G3D.Mesh` extends from `G3D.Node`, which has three properties: `position`, `rotation`, `scale`. These properties are used for 3D object's positioning.

## Basic usage

The `position`, `rotation` and `scale`, each one has three properties `x`, `y`, `z`. Modify `position`, you are translating the mesh, modify `rotation`, you are rotating the mesh, modify `scale`, you are scaling the mesh. You can replace the whole `position` object (as well as for `rotation` and `scale`):

```javascript
mesh.position = {x: 5, y: 3, z: 4};
```

Also, you can modify `x`, `y` or `z`, the are nearly the same for G3D.

```javascript
mesh.position.x = 5;
mesh.position.y = 4;
mesh.position.z = 3;
```

Then, let's follow the example to understand translating, rotating and scaling better.

<a class="jsbin-embed" href="https://jsbin.com/jarocek/latest/embed?js,output&height=500px">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?4.1.7"></script>

## Mesh

To make it clear, we first created a visible coordinate, which has three axis (lines), the red one is X, the green one is Y, the blue one is Z. Each of the line is upto 10 in length.

```javascript
const coord = G3D.MeshBuilder.createCoordinate(scene, 10);
```

Then, we created a cube with size 1.

```javascript
const cube = G3D.MeshBuilder.createCube(scene, 1);
```

At last, we created another coordinate mesh. This one is smaller (size is 3) than the previous one, and we specify the cube created before as it's **parent**. A parent of a mesh, is the one that the mesh belongs to. When parent is translated, rotated or scaled, children meshes will be moved or rotated as well. So in our case, when we transform the cube, the smaller coordinate will follow the cube.

```javascript
const cubeCoord = G3D.MeshBuilder.createCoordinate(scene, 3);
cubeCoord.parent = cube;
```

## dat.GUI

Then, we imported [dat.GUI](http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage) the library. This small libray can help us put a nice small dashboard on page's right top corner, and what we do on the dashboard will impact the scene.

For example, use dat.GUI to create a slider binding to `cube.position.x`:

```javascript
folder.add(cube.position, 'x', -5, 5);
```

It's a little like:

```javascript
slider.onChange(function(value){
    cube.position.x = value;
});
```

So, we create 9 sliders for 9 properties, each of `x`, `y` and `z` for each of `position`, `rotation` and `scale`. Drag the slider and see what happens.

## Position and Scale

It's pretty clear for position and scale. When translate a mesh, it's position is changeing, moving from a place to another. When scale a mesh, the size of the mesh changes, seems like it's been streched or squezzed.

## Rotation, the Euler Angle

Rotation is more complicated. Actually, there're several different ways to present rotation. G3D use a tradition way named euler angle, which present a rotation with three numbers `x`, `y` and `z`. For example, we set a mesh's rotation is [30, 45, 60] the euler angle, it means we rotate the mesh around X axis by 30 degreee, around Y axis by 45 degree, around Z axis by 60 degree.

> Rotating following the Right Hand Rule: use you right hand thumb to point along the rotation axis, and rotation direction is what the other four fingers are pointing.

```javascript
cube.rotation = {x: 30, y: 45, z: 60};
```

Besides the three numbers, euler need an order to rotate the mesh. 1) Rotate 30 degrees around X axis, and then rotate 45 around Y axis; 2) rotate 45 degrees around Y axis, and then rotate 30 around X axis; these two transformation is totally different. G3D used a common convention order: ZYX, which means: 

1. Firstly, rotate the specified `z` degrees around Z axis;
2. Secondly, rotate the specified `y` degrees around Y axis (Y axis here is the axis transformed by step 1, ie the smaller coordinate);
3. Finally, rotate the specified `x` degrees around X axis (X axis here is the axis transformed by step 1 and 2).

Play with the dashboard, you will find that rotating the cube in ZYX order is the only way to get what you expected.

> Here we use local coordinate (the smaller coordinate) to describe rotation, the order is ZYX; but if you rotate the mesh using the global coordinate (the bigger coordinate), you'll find the right order is XYZ.

## Summary

In this section, we discussed about translating, rotating and scale in 3D space. Sometimes we call them transform generally.