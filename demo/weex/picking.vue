<template>
    <div>
    <gcanvas v-if="isWeex" ref="canvas_holder" 
        @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
        style="width:750;height:750;"></gcanvas>
    <canvas v-if="!isWeex" ref="canvas_holder"
        @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
        style="width:750px;height:750px;"></canvas>
    </div>
</template>


<script>
import { isWeex } from "universal-env";
import { enable, Image as GImage, WeexBridge } from "gcanvas.js";

import G3D from "../../dist/g3d.min.js";
G3D.Env.Image = isWeex ? GImage : Image;
G3D.Env.manuallyFlipY = isWeex;
// G3D.Env.framebufferNotReady = isWeex;

import {
  touchStart as controlTouchStart,
  touchMove,
  touchEnd,
  controlArcRotateCamera
} from "./lib/attach-control";

import main from "../pages/picking-main.js";

function start(ref) {
  main(G3D, {
    canvas: ref,
    requestAnimationFrame: setTimeout,
    controlArcRotateCamera,
    onClickCanvas
  });
}

let onClickCanvasCallback = null;
function onClickCanvas(callback) {
  onClickCanvasCallback = callback;
}

export default {
  data() {
    return {
      isWeex: isWeex,
      touchStart: (...args) => {
        if (onClickCanvasCallback) {
          console.log("click callback");
          const { pageX: x, pageY: y } = args[0].changedTouches[0];
          console.log(x / 750 * WXEnvironment.deviceWidth)
          onClickCanvasCallback({
            offsetX: x / 750 * WXEnvironment.deviceWidth,
            offsetY: y / 750 * WXEnvironment.deviceWidth
          });
        }
        controlTouchStart(...args);
      },
      touchMove,
      touchEnd
    };
  },

  mounted: function() {
    var ref = this.$refs.canvas_holder;

    if (isWeex) {
      ref = enable(ref, { debug: false, bridge: WeexBridge });
    }

    ref.width = WXEnvironment.deviceWidth;
    ref.height = WXEnvironment.deviceWidth;

    start(ref);
  }
};
</script>