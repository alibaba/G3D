# PBRMaterial

PBR 材质。

## 构造函数

```javascript
new G3D.PBRMaterial();
```

## 属性

| 名称                     | 类型                              | 描述                                    |
| ------------------------ | --------------------------------- | --------------------------------------- |
| albedoColor              | {r: Number, g: Number, b: Number} | 基底色，默认为 {r: 255, g: 255, b: 255} |
| albedoTexture            | G3D.Texture                       | 基底纹理                                |
| metallic                 | Number                            | 金属度，取值范围在 0 到 1 之间          |
| roughness                | Number                            | 粗糙度，取值范围在 0 到 1 之间          |
| metallicRoughnessTexture | G3D.Texture                       | 金属度/粗糙度纹理                       |
| emissiveTexture          | G3D.Texture                       | 发光分量纹理                            |
| normalTexture            | G3D.Texture                       | 法线纹理                                |
| pbrEnviroment            | G3D.PBREnviroment                 | PBR 环境配置                            |

## 示例

```javascript
const material = new G3D.PBRMaterial();
material.albedoColor = {r: 255, g: 255, b: 255};
material.albedoTexture = new G3D.Texture(textureConfig);
material.matallic = 0.8;
material.roughness = 0.3;
material.pbrEnviroment = new G3D.PBREnviroment(pbrEnvConfig);

mesh.materials['default'] = material;
```