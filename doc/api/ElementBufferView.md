# ElementBufferView

Element data buffer view.

## Constructor

```javascript
new ElementBufferView(config);
```

### Arguments

| name              | type              | description                              |
| ----------------- | ----------------- | ---------------------------------------- |
| config            | Object            | config data                              |
| config.buffer     | G3D.ElementBuffer | data source                              |
| config.mode       | String            | draw mode, can be `TRIANGLES` or `LINES` |
| config.count      | Number            | vertices count indexed                   |
| config.byteOffset | Number            | offset                                   |

## Example

```javascript
const eleBufferView = new G3D.ElementBufferView({
    buffer: new G3D.ElementBuffer({
        data: new UInt32Array([0, 1, 2, 1, 2, 3])
    }),
    count: 6,
    offset: 0,
    mode: 'TRIANGLES'
});
```
