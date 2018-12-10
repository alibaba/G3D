# PBRMaterial

Physical based rendering material.

## Constructor

```javascript
new G3D.PBRMaterial();
```

## Properties

| name                     | type                              | description                                   |
| ------------------------ | --------------------------------- | --------------------------------------------- |
| albedoColor              | {r: Number, g: Number, b: Number} | base color, default is {r: 255, g:255, b:255} |
| albedoTexture            | G3D.Texture                       | base texture                                  |
| metallic                 | Number                            | metallic, varies in [0, 1]                    |
| roughness                | Number                            | roughness, varies in [0, 1]                   |
| metallicRoughnessTexture | G3D.Texture                       | metallic and Roughtness texture               |
| emissiveTexture          | G3D.Texture                       | emissive texture                              |
| normalTexture            | G3D.Texture                       | normal texture                                |
| pbrEnviroment            | G3D.PBREnviroment                 | PBR enviroment config                         |

## Example

```javascript
const material = new G3D.PBRMaterial();
material.albedoColor = {r: 255, g: 255, b: 255};
material.albedoTexture = new G3D.Texture(textureConfig);
material.matallic = 0.8;
material.roughness = 0.3;
material.pbrEnviroment = new G3D.PBREnviroment(pbrEnvConfig);

mesh.materials['default'] = material;
```