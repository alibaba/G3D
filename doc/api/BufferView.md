# BufferView

Data buffer view.

## Contructor

```javascript
new BufferView(config);
```

### Arguments

| name          | type       | description                                           |
| ------------- | ---------- | ----------------------------------------------------- |
| config        | Object     | config object                                         |
| config.buffer | G3D.Buffer | data source                                           |
| config.stride | Number     | stride between each part in data source, default is 0 |
| config.offset | Number     | offset in data source, default is 0                   |

## Example

```javascript
const bufferView = new G3D.BufferView({
    buffer: new Buffer({
        data: new Float32Array([
            0, 1, 2, 3, 4, 5, 6, 7
        ]),
        target: 'ARRAY_BUFFER'
    }),
    stride: 3,
    offset: 1
});
```