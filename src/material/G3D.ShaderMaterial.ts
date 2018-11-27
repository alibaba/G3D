import Program from '../core/G3D.Program';


interface IShaderMaterialConfig {
    name: string;
    vertexShaderSource: string;
    fragmentShaderSource: string;
    macros?: string[];
    uniforms?: string[];
    lighting?: boolean;
    shadow?: boolean;
}


class ShaderMaterial {

    static programs = {};
    program: Program;

    macros: string[];
    uniforms: string[];

    lighting: boolean;
    shadow: boolean;

    constructor(config: IShaderMaterialConfig) {

        const {
            name,
            vertexShaderSource: vShaderSource,
            fragmentShaderSource: fShaderSource,
            macros = [],
            uniforms = [],
            lighting = false,
            shadow = false,
        } = config;

        if (!ShaderMaterial.programs[name]) {
            ShaderMaterial.programs[name] = new Program({
                vShaderSource, fShaderSource
            });
        }

        this.program = ShaderMaterial.programs[name];

        this.macros = macros;
        this.uniforms = uniforms;

        this.lighting = lighting;
        this.shadow = shadow;
    }

    getDefines(): string[] {
        return this.macros.filter(macro => this.condition(macro));
    }

    condition(macro: string): boolean {
        return false;
    }

    uniform(name: string): Float32Array | WebGLTexture {
        return null;
    }

}

export default ShaderMaterial;