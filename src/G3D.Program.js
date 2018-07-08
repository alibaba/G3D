class Program {

    gl = null;
    program = null;
    uniforms = {};
    attributes = {};
    textureCount = 0;

    constructor({ gl, fShaderSource, vShaderSource }) {
        this.gl = gl;
        this.fShaderSource = fShaderSource;
        this.vShaderSource = vShaderSource;
        this.initProgram();
    }

    initProgram() {

        const gl = this.gl;
        const fShaderSource = this.fShaderSource;
        const vShaderSource = this.vShaderSource;

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
            const { baseVecType } = this.parseType(res.type);
            if (baseVecType === '2D') {
                const unit = ++this.textureCount;
                res.unit = unit;
            }
            if(baseVecType === 'CUB'){
                const unit = ++this.textureCount;
                res.unit = unit;
            }
            let name = uniform.name;
            if (name.endsWith('[0]')) {
                name = name.replace('[0]', '');
            }
            uniforms[name] = res;
        }

        this.program = program;
        this.attributes = attributes;
        this.uniforms = uniforms;
    }

    parseType(type) {
        const baseType = type.split('_')[0];
        const vecType = type.split('_').length > 1 ? type.split('_')[1] : 'VEC1';
        const baseVecType = vecType.substr(0, 3);
        const vecSize = Number(vecType[3]);
        return { baseType, vecType, baseVecType, vecSize };
    }

    uniform(name, value) {
        if (this.uniforms[name]) {

            const gl = this.gl;

            const { type, info, position, unit } = this.uniforms[name];
            const { baseType, vecType, baseVecType, vecSize } = this.parseType(type);

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
                case 'CUB':
                    {
                        gl.activeTexture(gl[`TEXTURE${unit}`]);

                        gl.bindTexture(gl.TEXTURE_CUBE_MAP, value);
                        gl.uniform1i(position, unit);
                        break;
                    }
                default:
                    throw new Error('baseVecType invalid ' + baseVecType);
            }

        } else {
            console.log(`[Warning] Uniform ${name} not exits.`, this);
        }
    }

    attribute(name, buffer, stride, offset) {
        if (this.attributes[name]) {
            const gl = this.gl;
            const { type, info, position } = this.attributes[name];
            const { baseType, vecType, baseVecType, vecSize } = this.parseType(type);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.vertexAttribPointer(position, vecSize, gl[baseType], false, stride, offset);
            gl.enableVertexAttribArray(position);
        }
    }
}

export default Program;