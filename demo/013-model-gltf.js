import G3D from '../src/G3D';
import main from './013-model-gltf-main';

import { controlArcRotateCamera } from './lib/attach-control';
import loader from './lib/loader';
import pbrAssets from './lib/pbr-assets';

main(G3D, {
    canvas: document.getElementById('canvas'),
    requestAnimationFrame,
    controlArcRotateCamera,
    loader,
    pbrAssets
});