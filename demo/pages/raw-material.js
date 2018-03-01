
import G3D from '../../src/G3D';
import main from './raw-material-main';

import { controlArcRotateCamera } from './lib/attach-control';
main(G3D, {
    canvas: document.getElementById('canvas'),
    requestAnimationFrame,
    controlArcRotateCamera
});