import G3D from '../src/G3D';
import main from './022-phong-material-main';

import { controlArcRotateCamera } from './lib/attach-control';
main(G3D, {
    canvas: document.getElementById('canvas'),
    requestAnimationFrame,
    controlArcRotateCamera
});