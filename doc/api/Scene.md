# Scene

Scene.

## Constructor

```javascript
new G3D.Scene(engine);
```

### Arguments

| name   | type       | description                              |
| ------ | ---------- | ---------------------------------------- |
| engine | G3D.Engine | the g3d render engine you created before |

## Properties

| name       | type                              | description                                                                |
| ---------- | --------------------------------- | -------------------------------------------------------------------------- |
| clearColor | {r: Number, g: Number, b: Number} | background color of the scene, the r/g/b component should be from 0 to 255 |

## Methods

### render()

Render the scene.

### pick(x, y)

Try to pick some mesh in the scene.

#### Arguments

| name | type   | description                              |
| ---- | ------ | ---------------------------------------- |
| x    | Number | the picking coordinate X value in canvas |
| y    | Number | the picking coordinate Y value in canvas |

#### returns

| type           | description                                   |
| -------------- | --------------------------------------------- |
| Number \| null | the picked mesh's id or null (picked no mesh) |

## Example

```javascript
const scene = new G3D.Scene(engine);
scene.clearColor = {r: 200, g: 200, b: 200};

function render(){
    scene.render();
    requestAnimationFrame(render);
}
```