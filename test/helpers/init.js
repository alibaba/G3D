function initCanvas() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    return canvas;
}

function initWebGL() {
    const canvas = initCanvas();
    const gl = canvas.getContext('webgl');
    return gl;
}

export { initCanvas, initWebGL };