# Engine

The render Engine of G3D.

## Constructor

```javascript
new G3D.Engine(canvas);
```

### options

| name   | type                                  | description                          |
| ------ | ------------------------------------- | ------------------------------------ |
| canvas | HTMLCanvasElement or GCanvas instance | the canvas instance to display scene |

## Properties

There's no public properties for `Engine`.

## Methods

There's no public methods for `Engine`.

## Examples

The only way to use Engine is passing `engine` to `Scene` constructor as the only parameter.

```javascript
const engine = new G3D.Engine(canvas);
const scene = new G3D.Scene(engine);
```