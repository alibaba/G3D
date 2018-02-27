function clamp(min, max, v) {
    if (v < min) {
        return min;
    } else if (v > max) {
        return max;
    } else {
        return v;
    }
}

export const controlArcRotateCamera = function (canvas, camera) {

    let isDragging = false;
    let lx = null;
    let ly = null;
    let r = 0;
    let radius = camera.radius;

    const start = () => isDragging = true;
    const end = () => {
        isDragging = false;
        lx = ly = null;
    };
    const move = ({ x, y }) => {
        if (isDragging) {
            if (lx === null) {
                lx = x;
                ly = y;
            } else {
                camera.alpha += (x - lx) / 5;
                camera.beta = clamp(-90, 90, camera.beta - (y - ly) / 5);
                lx = x;
                ly = y;
            }
        }
    }

    const wheel = (deltaY) => {
        r += deltaY / 100;
        r = clamp(-1, 1, r);
        camera.radius = radius * (1 + r * 0.6);
    }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mousemove', e => {
        move({ x: e.offsetX, y: e.offsetY });
    })
    canvas.addEventListener('mousewheel', e => {
        wheel(e.deltaY);
    })
}