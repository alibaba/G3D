# Engine

The render Engine of G3D.

## Constructor

```javascript
new G3D.Engine(canvas);
```

### Arguments

| name   | type              | description                          |
| ------ | ----------------- | ------------------------------------ |
| canvas | HTMLCanvasElement | the canvas instance to display scene |

## Example

```javascript
const engine = new G3D.Engine(canvas);
const scene = new G3D.Scene(engine);
```