# RawMaterial

原始材质，颜色与光源无关。

## 构造函数

```javascript
new G3D.RawMaterial(mesh);
```

## 属性

| 名称    | 类型                              | 描述                                      |
| ------- | --------------------------------- | ----------------------------------------- |
| color   | {r: Number, g: Number, b: Number} | 材质颜色，默认为 {r: 255, g: 255, b: 255} |
| texture | G3D.Texture                       | 材质纹理                                  |

## 示例

```javascript
const material = new G3D.RawMaterial();
material.color = {r: 100, g: 100, b: 200};
material.texture = new G3D.Texture(textureConfig);

mesh.materials['default'] = material;
```