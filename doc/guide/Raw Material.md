# Raw Material

Material and Light decide what exact color each pixel is filled with. When we created a mesh, a StandardMaterial will be created and assigned to `mesh.materials.default`.

`StandardMaterial` works with lights, without light any face with `StandardMaterial` will be black. The `StandardMaterial` is a little difficult to explain, so this chapter we'll learn a much simpler material, the `RawMaterial`.

`RawMaterial` is the kind of material that is not affected by lights. No matter what the lights are, raw material face will looks its own color.

`RawMaterial`'s structure is like:

* `RawMaterial`
    * `color`: object, following `{r, g, b}` pattern.
    * `texture`: instance of `G3D.Texture`.
        * `image`: instance of `G3D.Env.Image` (In browser, it's just `Image`, in hybrid envronment, it's defined by `GCanvas`).
    * `source`: enum, value may be `G3D.Material.COLOR` or `G3D.Material.TEXTURE`.

If `material.source` is `G3D.Material.COLOR`, the rendered pixel color will be `material.color` assigned, otherwise, the rendered pixel color will be picked from the texture image (this is where `uv` makes sense).

See the following example:

<iframe class="playground" src="https://gplatformteam.github.io/g3d-playground/docs/?embed#item=raw-material"></iframe>

Notice that there's no lights in the scene. Every pixel of the cube is the same color, it's a little wired that you can hardly sense it's a 3D cube.

Let's load an image as following and set the texture.

![](https://img.alicdn.com/tfs/TB11aE5XKSSBuNjy0FlXXbBpVXa-256-256.png)

Uncomment these lines, see what happens.

```javascript
loadImage(
    'https://img.alicdn.com/tfs/TB1apiEb8HH8KJjy0FbXXcqlpXa-1024-1024.png',
    function (image) {
        mesh.materials.default.texture.image = image;
        mesh.materials.default.source = G3D.Material.TEXTURE;
    }
)
```

Wati until the image is loaded, set to the texture's `image` property, nothing changed. We need to switch the `source` flag from `COLOR` (which is the default option) to `TEXTURE`.

OK, now we know how `RawMaterial` works, it's simple and effective, but not realistic. Next chapter we'll deal with `StandardMaterial`, a more complex type of material.