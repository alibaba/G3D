class Buffer {

    glBuffer = null;

    constructor({ data, target }) {

        const gl = GL.gl;

        if (typeof target === 'string') {
            target = gl[target];
        }

        const glBuffer = this.glBuffer = gl.createBuffer();

        gl.bindBuffer(target, glBuffer);
        gl.bufferData(target, data, gl.STATIC_DRAW);
        gl.bindBuffer(target, null);
    }

    destroy() {

        const { gl } = GL;

        gl.deleteBuffer(this.glBuffer);

    }
}

export default Buffer;