# PBRMaterial

Standard material, representing phong reflection face. Extends from [Material](./Material).

## Constructor

```javascript
new G3D.PBRMaterial();
```

## Properties

| name               | type                              | description                     |
| ------------------ | --------------------------------- | ------------------------------- |
| albedoColor        | {r: Number, g: Number, b: Number} | base color                      |
| metallic           | Number                            | metallic, varies in [0, 1]      |
| roughness          | Number                            | roughness, varies in [0, 1]     |
| diffuseMapTexture  | G3D.CubeTexture                   | env diffuse light cube texture  |
| specularMapTexture | G3D.CubeTexture                   | env specular light cube texture |