import G3D from '../src/G3D';
import main from './010-model-obj-load-cola-main';
import loader from './lib/loader';

import { controlArcRotateCamera } from './lib/attach-control';

main(G3D, {
    canvas: document.getElementById('canvas'),
    requestAnimationFrame,
    controlArcRotateCamera,
    loader
});