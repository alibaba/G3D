class Program {

    _gl = null;
    _program = null;
    _uniforms = {};
    _attributes = {};
    _textureCount = 0;

    constructor({ gl, fShaderSource, vShaderSource }) {
        this._gl = gl;
        this._fShaderSource = fShaderSource;
        this._vShaderSource = vShaderSource;
        this._initProgram();

    }

    _initProgram() {

        const gl = this._gl;
        const fShaderSource = this._fShaderSource;
        const vShaderSource = this._vShaderSource;

        function loadShader(gl, type, source) {
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw 'An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader);
            }
            return shader;
        }

        function getVariableType(gl, value) {
            const types = [
                'FLOAT', 'FLOAT_VEC2', 'FLOAT_VEC3', 'FLOAT_VEC4', 'FLOAT_MAT2', 'FLOAT_MAT3', 'FLOAT_MAT4',
                'INT', 'INT_VEC2', 'INT_VEC3', 'INT_VEC4',
                'BOOL', 'BOOL_VEC2', 'BOOL_VEC3', 'BOOL_VEC4',
                'SAMPLER_2D', 'SAMPLER_CUBE'
            ];

            for (let i = 0; i < types.length; i++) {
                if (gl[types[i]] === value) {
                    return types[i]
                }
            }

            throw new Error(`get type failed ' + value`);
        }

        const fShader = loadShader(gl, gl.FRAGMENT_SHADER, fShaderSource);
        const vShader = loadShader(gl, gl.VERTEX_SHADER, vShaderSource);

        const program = gl.createProgram();
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw 'Unable to initialize the shader program: ' + gl.getProgramInfoLog(program);
        }

        const uniforms = {};
        const attributes = {};

        const attributeCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attributeCount; i++) {
            const attribute = gl.getActiveAttrib(program, i);
            const res = {
                type: getVariableType(gl, attribute.type),
                position: gl.getAttribLocation(program, attribute.name),
                info: attribute
            };
            attributes[attribute.name] = res;
        }
        const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            const uniform = gl.getActiveUniform(program, i);
            const res = {
                type: getVariableType(gl, uniform.type),
                position: gl.getUniformLocation(program, uniform.name),
                info: uniform
            };
            const { baseVecType } = this._parseType(res.type);
            if (baseVecType === '2D') {
                const unit = ++this._textureCount;
                res.unit = unit;
            }
            let name = uniform.name;
            if (name.endsWith('[0]')) {
                name = name.replace('[0]', '');
            }
            uniforms[name] = res;
        }

        this._program = program;
        this._attributes = attributes;
        this._uniforms = uniforms;
    }

    _parseType(type) {
        const baseType = type.split('_')[0];
        const vecType = type.split('_').length > 1 ? type.split('_')[1] : 'VEC1';
        const baseVecType = vecType.substr(0, 3);
        const vecSize = Number(vecType[3]);
        return { baseType, vecType, baseVecType, vecSize };
    }

    uniform(name, value) {
        if (this._uniforms[name]) {

            const gl = this._gl;

            const { type, info, position, unit } = this._uniforms[name];
            const { baseType, vecType, baseVecType, vecSize } = this._parseType(type);

            switch (baseVecType) {
                case 'VEC':
                    {
                        const uniformMethodName = ['uniform', vecSize, baseType === 'FLOAT' ? 'f' : 'i', 'v'].join('');
                        gl[uniformMethodName](position, value);
                        break;
                    }
                case 'MAT':
                    {
                        const uniformMethodName = ['uniform', 'Matrix', vecSize, 'fv'].join('');
                        gl[uniformMethodName](position, false, value);
                        break;
                    }
                case '2D':
                    {
                        gl.activeTexture(gl[`TEXTURE${unit}`]);
                        gl.bindTexture(gl.TEXTURE_2D, value);
                        gl.uniform1i(position, unit);
                        break;
                    }
                default:
                    throw 'baseVecType invalid';
            }

        }
    }

    attribute(name, buffer) {
        if (this._attributes[name]) {
            const gl = this._gl;
            const { type, info, position } = this._attributes[name];
            const { baseType, vecType, baseVecType, vecSize } = this._parseType(type);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.vertexAttribPointer(position, vecSize, gl[baseType], false, 0, 0);
            gl.enableVertexAttribArray(position);
        }
    }
}

export default Program;