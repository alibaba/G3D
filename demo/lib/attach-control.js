function controlRotateCamera(canvas, camera) {
    function clamp(min, max, v) { return v < min ? min : v > max ? max : v; }
    var isDragging = false, lx = null, ly = null, r = 0, radius = camera.radius;
    function start() { isDragging = true; }
    function end() { isDragging = false; lx = ly = null; }
    function move(x, y) {
        if (!isDragging) { return; }
        if (lx === null) { lx = x; ly = y; }
        else { camera.alpha += (x - lx) / 5; camera.beta = clamp(-90, 90, camera.beta - (y - ly) / 5); lx = x; ly = y; }
    }
    function wheel(deltaY) { r += deltaY / 100; r = clamp(-1, 1, r); camera.radius = radius * (1 + r * 0.6); }
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mousemove', function (e) { move(e.offsetX, e.offsetY); });
    canvas.addEventListener('mousewheel', function (e) { wheel(e.deltaY); });
}

export default controlRotateCamera;