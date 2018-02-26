# Standard Material

## 3 Passes

`StandardMaterial` is more complex than `RawMaterial`. Basiclly, it has 3 pass:

* ambient pass: affected by `G3D.AmbientLight`, the only non-directional light in G3D.
* diffuse pass: affected by directional lights (includng `G3D.DirectionalLight`, `G3D.PointLight`, `G3D.HemisphereLight`).
* specular pass: affected by directional lights and camera position.

Basiclly, a pixel's color is computed like this way:

** color = ambientPass + diffusePass + specularPass **

Ambient pass is simple: (Note that ambientSource may comes from color or texture)

** ambientPass = ambientSource * ambientLight **

Diffuse pass is a little more complex. The diffuse factor is determined by light direction and face normal (this is where `normals` array in geometry makes sense).

** diffusePass = diffuseSource * directionalColor * diffuseFactor **

Specular pass is more complex. The specular factor is determined by light direction, face normal and camera position.

** specularPass = specularSource * directionColor * specularFactor **

See the following example: 

<iframe class="playground" src="https://gplatformteam.github.io/g3d-playground/docs/?embed#item=light-and-standard-material"></iframe>

Each face of the cube's color is different, you can easily figure out it's a 3D model. Here we add `DirectionalLight` to our scene. If we comment these create lights codes, cube will turn total black.

```javascript
// comment this lines and mesh will turn total black
const light1 = new G3D.DirectionalLight(scene);
light1.direction.x = 1;
light1.direction.y = 1;
light1.direction.z = 1;
```

Create an `AmbientLight`, and mesh is still black.

```javascript
const light2 = new G3D.AmbientLight(scene);
light2.intensity = 1.0;
```

Assign color to mesh's `ambientColor`, and mesh just looks like `RawMaterial`. This is because ambient light is simple ambient color multiply by ambient color, not affected by face normals and cameras.

We can restore the create light codes, and the cube will appear again.

## Inside each pass

As we mentioned above, `StandardMaterial` has 3 passes. Inside each pass, we can consider it as a `RawMaterial`: it has `color`, `texture`, and `source`. You can uncomment these two line to change diffuse pass source from `COLOR` to `TEXTURE`.

```javascript
mesh.materials.default.diffuseTexture.image = image;
mesh.materials.default.diffuseSource = G3D.Material.TEXTURE;
```

Usually we use texture on diffuse pass.

## EnvMap and Glossiness

Env map is used to simulate reflection of some cube.

See the example above:

<iframe class="playground" src="https://gplatformteam.github.io/g3d-playground/docs/?embed#item=envmap and glossiness"></iframe>

We loaded a image like this:

![](https://img.alicdn.com/tfs/TB1jxUkigvD8KJjy0FlXXagBFXa-1024-512.jpg)

And assigned image to the material's `envMapTexture` property. The image is a panoramic photo of a room, and it seems that the sphere is in the room, the surface is reflecting lights from the room.

Notice that env map only affect the specular pass.

```javascript
loadImage(
    'https://img.alicdn.com/tfs/TB1jxUkigvD8KJjy0FlXXagBFXa-1024-512.jpg',
    function (image) {
        mesh.materials.default.envMapTexture.image = image;
        mesh.materials.default.useEnvMap = true;
    }
)
```

The `glossiness` property represents the material's glossiness, which will affect specular pass. You can change the glossiness to see what happenned.

```javascript
Object.assign(mesh.materials.default, {glossiness: 2});
```

Now we got a good understanding of the standard material.