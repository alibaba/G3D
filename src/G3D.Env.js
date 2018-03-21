let _Image = null;


export default {
    get Image() {
        if (_Image) {
            return _Image;
        } else {
            return Image;
        }
    },

    set Image(image) {
        _Image = image;
    },

    manuallyFlipY: false,

    framebufferNotReady: false
}