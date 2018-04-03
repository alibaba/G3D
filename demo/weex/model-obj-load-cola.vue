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
// import { enable, Image as GImage, WeexBridge } from "gcanvas.js";
import { enable, Image as GImage, WeexBridge } from "../../../GCanvas/GCanvas/js/src/index";


import G3D from "../../dist/g3d.min.js";
G3D.Env.Image = isWeex ? GImage : Image;
G3D.Env.manuallyFlipY = isWeex;
G3D.Env.framebufferNotReady = isWeex;

import {
  touchStart,
  touchMove,
  touchEnd,
  controlArcRotateCamera
} from "./lib/attach-control";
import loader from './lib/loader';

import main from "../pages/model-obj-load-cola-main.js";

function start(ref, size) {

  main(G3D, {
    canvas: ref,
    requestAnimationFrame: setTimeout,
    controlArcRotateCamera,
    loader
  });
}

export default {
  data() {
    return {
      isWeex: isWeex,
      touchStart,
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