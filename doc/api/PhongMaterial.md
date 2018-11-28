# PhongMaterial

Phong material, representing phong reflection face.

## Constructor

```javascript
new G3D.PhongMaterial();
```

## Properties

| name                  | type                              | description                |
| --------------------- | --------------------------------- | -------------------------- |
| ambientColor          | {r: Number, g: Number, b: Number} | ambient color              |
| ambientTexture        | G3D.Texture                       | ambient texture            |
| diffuseColor          | {r: Number, g: Number, b: Number} | diffuse color              |
| diffuseTexture        | G3D.Texture                       | diffuse texture            |
| specularColor         | {r: Number, g: Number, b: Number} | specular color             |
| specularTexture       | G3D.Texture                       | specular texture           |
| glossiness            | Number                            | glossiness, from 1 to 1000 |
| specularEnvMapTexture | G3D.Texture                       | env map texture            |

## Example

```javascript
const material = new G3D.PhongMaterial();
material.ambientColor = {r: 255, g: 255, b: 255};
material.diffuse = {r: 100, g: 100, b: 100};
material.diffuseTexture = new G3D.Texture(textureConfig);
material.specular = {r: 100, g: 100, b: 100};

mesh.materials['default'] = material;
```