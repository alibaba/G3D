
// import G3D from '../../src/G3D';
import G3D from '../../dist/g3d.min.js';
import main from './raw-material-main';

import { controlArcRotateCamera } from './lib/attach-control';
main(G3D, {
    canvas: document.getElementById('canvas'),
    requestAnimationFrame,
    controlArcRotateCamera
});