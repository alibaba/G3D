# PBREnviroment

## 构造函数

```javascript
new PBREnviroment(config);
```

### 参数

| 名称                               | 类型   | 描述                                                                                                  |
| ---------------------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| config                             | Object | 配置对象                                                                                              |
| config.lut                         | Image  | BRDFLut 图像                                                                                          |
| config.diffuse                     | Object | 散射环境贴图集合                                                                                      |
| config.diffuse[face]               | Image  | 指定方向的散射环境贴图，face 可以是 `front`，`back`，`top`，`bottom`，`left`，`right`                 |
| config.specular                    | Object | 反射环境贴图集合                                                                                      |
| config.specular[face]              | Image  | 指定方向的反射环境贴图，face 可以是 `front`，`back`，`top`，`bottom`，`left`，`right`                 |
| config.specular[face].mip          | Array  | MipMap 反射环境贴图列表                                                                               |
| config.specular[face].mip[i]       | Object | 特定层级的 MipMap 反射环境贴图                                                                        |
| config.specular[face].mip[i][face] | Object | 特定层级指定方向的 MipMap 反射环境贴图，face 可以是 `front`，`back`，`top`，`bottom`，`left`，`right` |

## 示例

```javascript
const pbrEnv = new G3D.PBREnviroment({
    lut: lutImage,
    diffuse: {
        front: dfFrImage,
        back: dfBkImage,
        top: dfTpImage,
        bottom: dfBtImage,
        left: dfLfImage,
        right: dfRtImage
    },
    specular: {
        front: spFrImage0,
        back: spBkImage0,
        top: spTpImage0,
        bottom: spBtImage0,
        left: spLfImage0,
        right: spRtImage0,
        mip: [
            {
                front: spFrImage1,
                back: spBkImage1,
                top: spTpImage1,
                bottom: spBtImage1,
                left: spLfImage1,
                right: spRtImage1
            },
            {
                front: spFrImage2,
                back: spBkImage2,
                top: spTpImage2,
                bottom: spBtImage2,
                left: spLfImage2,
                right: spRtImage2             
            },
            ...
        ]
    }
})
```