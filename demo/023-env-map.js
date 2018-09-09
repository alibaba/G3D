// G3D_TEMPLATE_GENERATED
import G3D from '../src/G3D';

import main from './023-env-map-main';
import loader from './lib/loader';
import pbrAssets from './lib/pbr-assets';
import { controlArcRotateCamera } from './lib/attach-control';

const canvas = document.getElementById('canvas');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

main(G3D, {
    canvas,
    requestAnimationFrame,
    controlArcRotateCamera,
    pbrAssets,
    loader,
    onClickCanvas: function (callback) {
        canvas.addEventListener('click', callback)
    }
});