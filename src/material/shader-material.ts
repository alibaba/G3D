import Shader from '../core/shader';
import Program from '../core/program';


interface IShaderMaterialConfig {
    name: string;
    vertexShaderSource: string;
    fragmentShaderSource: string;
    macros?: string[];
    uniforms?: string[];
    lighting?: boolean;
    shadow?: boolean;
    camera?: boolean;
    passes?: {
        depthTest: boolean;
        blend: boolean;
        cullFace: boolean;
        uniforms: {
            name: string;
            value: any;
        }[];
    }[];
}


class ShaderMaterial {

    static shaders = {};
    private shader: Shader;

    macros: string[];
    uniforms: string[];

    lighting: boolean;
    shadow: boolean;
    camera: boolean;
    passes: {
        depthTest: boolean;
        blend: boolean;
        cullFace: boolean;
        uniforms: {
            name: string;
            value: any;
        }[]
    }[];

    constructor(config: IShaderMaterialConfig) {

        const {
            name,
            vertexShaderSource: vShaderSource,
            fragmentShaderSource: fShaderSource,
            macros = [],
            uniforms = [],
            lighting = false,
            shadow = false,
            camera = false,
            passes = [{
                depthTest: true,
                blend: false,
                cullFace: true,
                uniforms: []
            }]
        } = config;

        if (!ShaderMaterial.shaders[name]) {
            ShaderMaterial.shaders[name] = new Shader({
                vShaderSource, fShaderSource
            });
        }

        this.shader = ShaderMaterial.shaders[name];

        this.macros = macros;
        this.uniforms = uniforms;

        this.lighting = lighting;
        this.shadow = shadow;
        this.camera = camera;

        this.passes = passes;
    }

    getProgram(globalDefines: string[]): Program {
        const localDefines = this.macros.filter(macro => this.condition(macro));
        return this.shader.program([...localDefines, ...globalDefines]);
    }

    condition(macro: string): boolean {
        return false;
    }

    uniform(name: string): Float32Array | WebGLTexture {
        return null;
    }
}

export default ShaderMaterial;