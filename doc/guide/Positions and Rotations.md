# Positions and Rotations

We use 3D coordinates to locate objects in a 3D space, as the following picture shows:

![coordinates](https://img.alicdn.com/tfs/TB1HluJXQyWBuNjy0FpXXassXXa-700-375.png)

We could call `G3D.MeshBuilder.createCoordinate` to create a coordinate marker in the scene. It's convinient when you are debugging and want to know what position you put your mesh at. The coordinate has three axis, the red one is X axis, green one is Y axis, blue one is Z axis.

Take a look at this example:

<iframe class="playground" src="https://g-platform.github.io/g3d-playground/docs/?embed#item=positions-and-rotations"></iframe>

Basiclly, you can locate meshes by assigning to `mesh.position`, `mesh.rotation` and `mesh.scale`.

* Position: By assigning to `mesh.position`, the mesh moves along the specified axis.
* Rotation: By assigning to `mesh.rotation`, the mesh rotates around the specified axis.
* Scale: By assigning to `mesh.scale`, the mesh scale along the specified axis.

Try uncomment these lines, you'll find the cube's initial state is changed.

```javascript
// init mesh position
// Object.assign(mesh.position, {x: 3, y: 0, z: 0});

// init mesh rotation
// Object.assign(mesh.rotation, {x: 45, y: 0, z: 0});

// init mesh scale
// Object.assign(mesh.scale, {x: 2, y: 1, z: 1});
```

Try uncomment these lines, you'll find the cube is animated.

```javascript
// rotate camera for viewing the scene
// camera.alpha += 1;

// translate mesh animation
// mesh.position.x += 0.005;

// rotate mesh animation
// mesh.rotation.x += 1;

// scale mesh animation
// mesh.scale.x *= 1.0001;
```

[Next Chapter](./Create Mesh)