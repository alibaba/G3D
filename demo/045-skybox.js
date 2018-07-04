import G3D from '../src/G3D';
import main from './045-skybox-main';

import { controlArcRotateCamera } from './lib/attach-control';
import loader from './lib/loader';

main(G3D, {
    canvas: document.getElementById('canvas'),
    requestAnimationFrame,
    controlArcRotateCamera,
    loader
});