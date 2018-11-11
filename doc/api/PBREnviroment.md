# PBREnviroment

PBR enviroment config object.

## 构造函数

```javascript
new PBREnviroment(config);
```

### 参数

| 名称                               | 类型   | 描述                                                                                                                      |
| ---------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| config                             | Object | config object                                                                                                             |
| config.lut                         | Image  | BRDFLut Image                                                                                                             |
| config.diffuse                     | Object | collection of diffuse enviroment map images                                                                               |
| config.diffuse[face]               | Image  | diffuse image of a specified face, face can be `front`, `back`, `top`, `bottom`, `left`, `right`                          |
| config.specular                    | Object | collection of specular enviroment map images                                                                              |
| config.specular[face]              | Image  | specular image of a specified face, face can be `front`, `back`, `top`, `bottom`, `left`, `right`                         |
| config.specular[face].mip          | Array  | specular mipmaps                                                                                                          |
| config.specular[face].mip[i]       | Object | specular mipmaps of a specified level                                                                                     |
| config.specular[face].mip[i][face] | Object | specular mipmaps of a specified level and a specified face, face can be `front`，`back`，`top`，`bottom`，`left`，`right` |

## Example

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