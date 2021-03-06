# Raw Material

The geometry of a mesh determines which pixels will be rendered, and the materials of a mesh determine what color will be drawed on the pixel.

Raw material is the simplest material in G3D. It does not depends on lighting, camera and the infomation about the 3D scene. We can specify some color to the raw material, and the rendered color will be exactly the same with what we just specified, no matter whether there's lights in the scene, and how the camera or the mesh is positioned.

See the example:

<a class="jsbin-embed" href="https://jsbin.com/xebajay/latest/embed?js,output&height=500px">JS Bin on jsbin.com</a>

In this demo, there's a square mesh inside X-Y plane, center at the origin point. The square are composed of two triangles, as the following picture shows. The square has 4 vertices (A,B,C,D) and 6 vertice indexes (ABC,ACD).

![](https://gw.alicdn.com/tfs/TB1c54gvwDqK1RjSZSyXXaxEVXa-439-399.png)

We make vertices array, normals array, uvs array and indices arrays to construct the mesh. Vertices values are shown in the picture above, and normals are all (0,0,1).

```javascript
const mesh = new G3D.Mesh(scene);
mesh.geometry = new G3D.Geometry({
    vertices: [
        -1, -1, 0, // A
        1, -1, 0,  // B
        1, 1, 0,   // C
        -1, 1, 0   // D
    ],
    normals: [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ],
    uvs: [
        0, 0,  // A
        1, 0,  // B
        1, 1,  // C
        0, 1   // D
    ],
    indices: {
        default: [0, 1, 2, 0, 2, 3]
    }
});
```

Then we create a RawMaterial instance `rMtl` and specify its color as (200,100,100). Assign `rMtl` to `mesh.materials.default`, cause when creating geometry, there's also a `default` array in indices. Actually, a mesh could have multiple parts, each part has a indices array and a material. The `default` could be any other meaningful names.

```javascript
const rMtl = new G3D.RawMaterial();
rMtl.color = {r: 200, g: 100, b: 100};
mesh.materials.default = rMtl;
```

So we get a light red square. Its material is RawMaterial, so the color rendered is exactly the same with `rMtl.coloc`. Changing `rMtl.color` would change the square color, as the following code shows:

```javascript
rMtl.color.r = 100;
rMtl.color = {r: 100, g: 100, b: 100};
```

In this demo we use dat.GUI to draw some interactive slides on the right-top corner. Manually slide them to adjust color. Notice that each componet (R/G/B) should be limited in [0, 255].

Raw material could have colors as well as textures. For example, we can load this picture:

![](https://img.alicdn.com/tfs/TB11aE5XKSSBuNjy0FlXXbBpVXa-256-256.png)

And then create a texture within the image.

```javascript
loader.loadImage(
    '//img.alicdn.com/tfs/TB11aE5XKSSBuNjy0FlXXbBpVXa-256-256.png',
    function(image){
        // (image instanceOf Image) === true
        const texture = new G3D.Texture({image});
    }
);
```

When we check the 'texture' checkbox, the `texture` object will be assigned to `rMtl.texture`, and the texture will be attached to the square.

```
rMtl.texture = texture;
```

You may find the color of the texture seems wired if the texture's color is not pure white (255,255,255). This is because, the ouput color will be effected by not only the texture color `rMtl.texture`, but also the color `rMtl.color`. To be precise, the output color will be the texture color multiply the normalized material color per component. For example, if the material color's R value is 127 (`rMtl.color.r === 127`), so the normalized color's R component is 0.5, so for every pixel in the texture, their R value would multiply by 0.5, then we get the color('s R component) rendered on screen.

* If rMtl.texture is not exist，the rendered color = color.
* If rMtl.texture exists，the rendered color = textureColor * color (per component).

At last, let's study about UV. When creating the geometry, we pass in a uvs array, for each vertex, uvs array supply 2 values U and V. For vertex A, UV is (0,0), for B UV is (1,0). UV is the 'texture coordinate values', (0,0) is at the left-bottom corner, and (1,1) is at the right-top corner. In this demo, vertex A is mapped to the left-bottom corner of the texture, and vertex C is mapped to the right-top corner. By doing this, we tell WebGL how to attach the texture to mesh.

```javascript
uvs: [
    0, 0,  // A
    1, 0,  // B
    1, 1,  // C
    0, 1   // D
]
```

Try changing UV value, as change vertex B values to (1,1) or (0.5,0), see what happend to the attached texture.

Actually, in the texture coordinate system, (0,0) is not always at left-bottom corner. Actually, it's at left-top corner by default in WebGL system. Because most 3D applications consider (0,0) as the left-bottom coner, WebGL provide a option to enable flipping Y in the texture (UNPACK_FLIP_Y_WEBGL for pixelStorei). G3D enables the option by default, but if you want to disable it for some reason, you can pass flipY:false when creating the texture.

```javascript
new G3D.Texture({image, flipY: false}); // flipY is true by default
```

Raw materials is a basic material, which does not depend on lighting. It's simulating for reallity is limited. We can create a cube mesh within raw material to see what it looks like.

<a class="jsbin-embed" href="https://jsbin.com/ludubot/latest/embed?js,output&height=500px">JS Bin on jsbin.com</a>

We put a cube inside the 3D scene, because the cube's mesh is raw material with pure color, we can not even recongnize it's a 3d model, for it looks like a 2D hexagon. We'll introduce some advanced materials in the following sections, they'll make the mesh looks much better.

## Summary

In this section, we learned about basic usage about material and texture, and learned the simplest material in G3D: raw material.

<script src="https://static.jsbin.com/js/embed.min.js?4.1.7"></script>
