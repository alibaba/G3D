let THE_IMAGE = null;

export default {
    get Image() {
        if (THE_IMAGE) {
            return THE_IMAGE;
        } else {
            return Image;
        }
    },

    set Image(image) {
        THE_IMAGE = image;
    },

    manuallyFlipY: false,

    framebufferNotReady: false,

    pbrNotReady: false,
};
