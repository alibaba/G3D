# ElementBufferView

Element data buffer view.

## Constructor

```javascript
new ElementBufferView(config);
```

### Arguments

| name          | type       | description                              |
| ------------- | ---------- | ---------------------------------------- |
| config        | Object     | config data                              |
| config.buffer | G3D.Buffer | data source                              |
| config.mode   | String     | draw mode, can be `TRIANGLES` or `LINES` |
| config.count  | Number     | vertices count indexed                   |
| config.offset | Number     | offset                                   |

## Example

```javascript
const eleBufferView = new G3D.ElementBufferView({
    buffer: new G3D.Buffer({
        data: new UInt8Array([0, 1, 2, 1, 2, 3])
        target: 'ELEMENT_ARRAY_BUFFER'
    })
    count: 6,
    offset: 0,
    mode: 'TRIANGLES'
});
```
