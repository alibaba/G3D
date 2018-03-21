import G3D from '../../src/G3D';
import main from './shadow-directional-light-main';

import { controlArcRotateCamera } from './lib/attach-control';

main(G3D, {
    canvas: document.getElementById('canvas'),
    requestAnimationFrame,
    controlArcRotateCamera
});