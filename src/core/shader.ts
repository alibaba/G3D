import GL from "./gl";
import Program from "./program";

interface IShader {
    fShaderSource: string;
    vShaderSource: string;
}

class Shader {

    public programs: { [prop: string]: Program } = {};

    private fShaderSource: string;
    private vShaderSource: string;

    private extensions: string[] = [];
    private precisions: string[] = [];

    constructor({ fShaderSource, vShaderSource }: IShader) {

        this.fShaderSource = fShaderSource;
        this.vShaderSource = vShaderSource;

        for (const key of GL.extensions.keys()) {
            if (GL.extensions.get(key) !== undefined) {
                this.extensions.push(`EXT_${key}`);
            }
        }

        this.precisions.push(`PRECISION_FLOAT_${GL.precisions.get("float").toUpperCase()}`);
    }

    public program(defines: string[]): Program {

        defines = defines.sort();

        const definesKey = defines.join(";");

        if (!this.programs[definesKey]) {

            const definesString =
                [...this.precisions, ...this.extensions, ...defines].map(
                    (name) => `#define ${name} 1`,
                ).join("\n") + "\n";

            this.programs[definesKey] = new Program({
                vShaderSource: definesString + this.vShaderSource,
                fShaderSource: definesString + this.fShaderSource,
            });
        }

        return this.programs[definesKey];
    }

    public destructor(): void {
        for (const key in this.programs) {
            this.programs[key].destructor();
        }
    }
}

export default Shader;
