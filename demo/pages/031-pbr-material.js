import G3D from '../../src/G3D';
import main from './031-pbr-material-main';
import loader from './lib/loader';
import pbrAssets from './lib/pbr-assets';

import { controlArcRotateCamera } from './lib/attach-control';

main(G3D, {
    canvas: document.getElementById('canvas'),
    requestAnimationFrame,
    controlArcRotateCamera,
    loader,
    pbrAssets
});