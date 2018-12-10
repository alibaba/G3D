# PhongMaterial

冯氏面材质，遵循冯氏反射模型。

## 构造函数

```javascript
new G3D.PhongMaterial();
```

## 属性

| 名称                  | 类型                              | 描述                     |
| --------------------- | --------------------------------- | ------------------------ |
| ambientColor          | {r: Number, g: Number, b: Number} | 环境色                   |
| ambientTexture        | G3D.Texture                       | 环境色纹理               |
| diffuseColor          | {r: Number, g: Number, b: Number} | 散射色                   |
| diffuseTexture        | G3D.Texture                       | 散射色纹理               |
| specularColor         | {r: Number, g: Number, b: Number} | 反射色                   |
| specularTexture       | G3D.Texture                       | 反射色纹理               |
| glossiness            | Number                            | 光泽度，取值从 1 到 1000 |
| specularEnvMapTexture | G3D.Texture                       | 反射环境纹理             |

## 示例

```javascript
const material = new G3D.PhongMaterial();
material.ambientColor = {r: 255, g: 255, b: 255};
material.diffuse = {r: 100, g: 100, b: 100};
material.diffuseTexture = new G3D.Texture(textureConfig);
material.specular = {r: 100, g: 100, b: 100};

mesh.materials['default'] = material;
```