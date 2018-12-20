function initCanvas(width = 512, height = width) {
    const canvas = document.createElement('canvas');

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;

    document.body.appendChild(canvas);
    return canvas;
}

function initWebGL() {
    const canvas = initCanvas();
    const gl = canvas.getContext('webgl');
    return gl;
}

export { initCanvas, initWebGL };