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
| config.data   | Float32Array \| Uint32Array | data                                                         |
| config.target | string                      | buffer type, can be 'ARRAY_BUFFER' or 'ELEMENT_ARRAY_BUFFER' |

## Example

```javascript
const buffer = new G3D.Buffer({
    data: new Float32Array([
        1, 0, 0, 
        0, 1, 0
    ]),
    target: 'ARRAY_BUFFER'
});
```

