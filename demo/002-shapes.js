// G3D_TEMPLATE_GENERATED
import G3D from '../src/G3D';

import main from './002-shapes-main';
import loader from './lib/loader';
import pbrAssets from './lib/pbr-assets';
import controlRotateCamera from './lib/attach-control';

const canvas = document.getElementById('canvas');
canvas.width = document.documentElement.clientWidth * devicePixelRatio;
canvas.height = document.documentElement.clientHeight * devicePixelRatio;
canvas.style.width = document.documentElement.clientWidth + 'px';
canvas.style.height = document.documentElement.clientHeight + 'px';

main(G3D, {
    canvas,
    requestAnimationFrame,
    pbrAssets,
    loader,
    onClickCanvas: function (callback) {
        canvas.addEventListener('click', callback)
    },
});

controlRotateCamera(canvas, G3D.Engine.instance.currentScene.activeCamera);