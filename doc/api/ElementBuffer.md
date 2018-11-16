# ElementBuffer

Vertex index data buffer.

## Constructor

```javascript
new G3D.ElementBuffer(config);
```

### Arguments

| name        | type                                      | description   |
| ----------- | ----------------------------------------- | ------------- |
| config      | Object                                    | config object |
| config.data | UInt32Array \| UInt16Array \| ArrayBuffer | data source   |

## Example

```javascript
const buffer = new G3D.ElementBuffer({
    data: new UInt32Array([0, 1, 2, 0, 2, 3])
});
```
