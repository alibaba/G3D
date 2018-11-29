import GL from './G3D.GL';
import Program from './G3D.Program';

interface IShader {
    fShaderSource: string;
    vShaderSource: string;
}

class Shader {

    private fShaderSource: string;
    private vShaderSource: string;

    private extensions: string[] = [];
    private precisions: string[] = [];

    programs: { [prop: string]: Program } = {};

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

        if (!this.programs[definesKey]) {

            const definesString = [...this.precisions, ...this.extensions, ...defines].map(name => `#define ${name} 1`).join('\n') + '\n';

            this.programs[definesKey] = new Program({
                vShaderSource: definesString + this.vShaderSource,
                fShaderSource: definesString + this.fShaderSource
            });
        }

        return this.programs[definesKey];
    }

    destructor(): void {
        for (let key in this.programs) {
            this.programs[key].destructor();
        }
    }
}

export default Shader;