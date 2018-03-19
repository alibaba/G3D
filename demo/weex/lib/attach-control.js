function clamp(min, max, v) {
    if (v < min) {
        return min;
    } else if (v > max) {
        return max;
    } else {
        return v;
    }
}



let isDragging = false;
let lx = null;
let ly = null;
let r = 0;
let camera = null;
const start = () => isDragging = true;
const end = () => {
    isDragging = false;
    lx = ly = null;
};
const move = ({ x, y }) => {
    if (isDragging && camera) {
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


const controlArcRotateCamera = function (canvas, c) {
    camera = c;
}

function touchStart(e) {
    start();
}

function touchMove(e) {
    const event = e.changedTouches[0];
    move({ x: event.pageX, y: event.pageY });
}

function touchEnd(e) {
    end();
}



export { controlArcRotateCamera, touchStart, touchMove, touchEnd };
