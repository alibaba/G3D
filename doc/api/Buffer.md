# Buffer

Data buffer.

## Contructor

```javascript
new G3D.Buffer(config);
```

### Arguments

| name          | type                        | description                                                  |
| ------------- | --------------------------- | ------------------------------------------------------------ |
| config        | Object                      | config object                                                |
| config.data   | Float32Array \| ArrayBuffer | data                                                         |

## Example

```javascript
const buffer = new G3D.Buffer({
    data: new Float32Array([
        1, 0, 0, 
        0, 1, 0
    ])
});
```

