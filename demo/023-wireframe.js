import G3D from '../src/G3D';
import main from './023-wireframe-main';

import { controlArcRotateCamera } from './lib/attach-control';

main(G3D, {
    canvas: document.getElementById('canvas'),
    requestAnimationFrame,
    controlArcRotateCamera
});