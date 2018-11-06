# Scene

The render scene of G3D.

## Constructor

```javascript
new G3D.Scene(engine);
```

### options

| name   | type       | description                              |
| ------ | ---------- | ---------------------------------------- |
| engine | G3D.Engine | the g3d render engine you created before |

## Properties

| name       | type                              | description                                                                |
| ---------- | --------------------------------- | -------------------------------------------------------------------------- |
| clearColor | {r: Number, g: Number, b: Number} | background color of the scene, the r/g/b component should be from 0 to 255 |

## Methods

### render()

#### options

No options.

#### returns

Void.

### pick(x, y, flip)

#### options

| name | type    | description                                    |
| ---- | ------- | ---------------------------------------------- |
| x    | Number  | the picking coordinate X value in canvas       |
| y    | Number  | the picking coordinate Y value in canvas       |
| flip | Boolean | whether to flip Y coordinates, default is true |

#### returns

id: Number | null, the picked mesh's id or null (picked no mesh)

## Examples

```javascript
const scene = new G3D.Scene(engine);

scene.clearColor.r = 20;
scene.clearColor.g = 20;
scene.clearColor.b = 20;

function render(){
    scene.render();
    requestAnimationFrame(render);
}
```