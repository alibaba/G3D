import GL from './G3D.GL';
import Program from './G3D.Program';

interface IShader {
    fShaderSource: string;
    vShaderSource: string;
}

class Shader {

    fShaderSource: string;
    vShaderSource: string;

    extensions: string[] = [];
    precisions: string[] = [];

    definedPrograms: { [prop: string]: Program } = {};

    constructor({ fShaderSource, vShaderSource }: IShader) {

        this.fShaderSource = fShaderSource;
        this.vShaderSource = vShaderSource;

        for (let key in GL.extensions) {
            if (GL.extensions[key] !== null) {
                this.extensions.push(`EXT_${key}`);
            }
        }

        this.precisions.push(`PRECISION_FLOAT_${GL.precisions.float.toUpperCase()}`);
    }

    program(defines: string[]): Program {

        defines = defines.sort();

        const definesKey = defines.join(';');

        if (!this.definedPrograms[definesKey]) {

            const definesString = [...this.precisions, ...this.extensions, ...defines].map(name => `#define ${name} 1`).join('\n') + '\n';

            this.definedPrograms[definesKey] = new Program({
                vShaderSource: definesString + this.vShaderSource,
                fShaderSource: definesString + this.fShaderSource
            });
        }

        return this.definedPrograms[definesKey];
    }

    destructor(): void {
        for (let key in this.definedPrograms) {
            this.definedPrograms[key].destructor();
        }
    }
}

export default Shader;