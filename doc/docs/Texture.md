# Texture

The texture applied to material.

## Constructor

```javascript
new G3D.Texture(material);
```

### options

| name     | type         | description                               |
| -------- | ------------ | ----------------------------------------- |
| material | G3D.Material | the material which the texture applied to |

## Properties

| name   | type                   | description      |
| ------ | ---------------------- | ---------------- |
| image  | G3D.Env.Image          | the image object |
| offset | {x: Number, y: Number} | the uv offset    |

## Examples

```javascript
const image = new G3D.Env.Image();

image.onload = function(){
    const mesh = G3D.MeshBuilder.createCube(scene, 1, 1);

    const texture = new G3D.Texture(mesh.materials.default);
    texture.image = image;

    mesh.materials.default.texture = texture;
    mesh.materials.default.source = G3D.Materials.TEXTURE;
}
image.src = theImageUrl;
```