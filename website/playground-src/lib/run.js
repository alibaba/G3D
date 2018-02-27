import G3D from '../../../src/G3D';

function run(code, canvas, onError) {

    code = code.split('\n').filter(Boolean).filter((line, i, arr) =>
        i !== 0 && i !== arr.length - 1
    ).join('\n');

    const func = new Function('G3D', 'canvas', code);

    if (typeof func !== 'function') {
        throw new Error('playground code should be a function but not ' + typeof func);
    }

    const render = func(G3D, canvas);

    if (typeof render !== 'function') {
        throw new Error('playground function should return a function but not ' + typeof render);
    }

    let stop = false;

    function tick() {
        if (stop) {
            return;
        }
        try {
            render();
            requestAnimationFrame(tick);
        } catch (e) {
            onError(e);
        }
    }
    tick();

    return function () {
        stop = true;
    }
}

export default run;