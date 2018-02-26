# StandardMaterial

Standard material, representing phong reflection face. Extends from Material.

## Constructor

```javascript
new G3D.StandardMaterial(mesh);
```

| name | type     | description                 |
| ---- | -------- | --------------------------- |
| mesh | G3D.Mesh | the mesh the material is on |

## Properties

| name            | type                                    | description                              |
| --------------- | --------------------------------------- | ---------------------------------------- |
| ambientColor    | {r: Number, g: Number, b: Number}       | ambient color                            |
| ambientTexture  | G3D.Texture                             | ambient texture                          |
| ambientSource   | enum {Material.COLOR, Material.TEXTURE} | whether to use ambient color or texture  |
| diffuseColor    | {r: Number, g: Number, b: Number}       | diffuse color                            |
| diffuseTexture  | G3D.Texture                             | diffuse texture                          |
| diffuseSource   | enum {Material.COLOR, Material.TEXTURE} | whether to use diffuse color or texture  |
| specularColor   | {r: Number, g: Number, b: Number}       | specular color                           |
| specularTexture | G3D.Texture                             | specular texture                         |
| specularSource  | enum {Material.COLOR, Material.TEXTURE} | whether to use specular color or texture |
| glossiness      | Number                                  | glossiness, from 1 to 1000               |
| envMapTexture   | G3D.Texture                             | env map texture                          |
| useEnvMap       | Boolean                                 | wether to use env map                    |
