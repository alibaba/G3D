import Program from "../core/program";
import Shader from "../core/shader";

interface IShaderMaterialConfig {
    name: string;
    vertexShaderSource: string;
    fragmentShaderSource: string;
    macros?: string[];
    uniforms?: string[];
    lighting?: boolean;
    shadow?: boolean;
    camera?: boolean;
    passes?: Array<{
        depthTest: boolean;
        blend: boolean;
        cullFace: boolean;
        uniforms: Array<{
            name: string;
            value: any;
        }>;
    }>;
}

class ShaderMaterial {

    public static shaders = {};

    public macros: string[];
    public uniforms: string[];

    public lighting: boolean;
    public shadow: boolean;
    public camera: boolean;
    public passes: Array<{
        depthTest: boolean;
        blend: boolean;
        cullFace: boolean;
        uniforms: Array<{
            name: string;
            value: any;
        }>
    }>;
    private shader: Shader;

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
                uniforms: [],
            }],
        } = config;

        if (!ShaderMaterial.shaders[name]) {
            ShaderMaterial.shaders[name] = new Shader({
                vShaderSource, fShaderSource,
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

    public getProgram(globalDefines: string[]): Program {
        const localDefines = this.macros.filter((macro) => this.condition(macro));
        return this.shader.program([...localDefines, ...globalDefines]);
    }

    public condition(macro: string): boolean {
        return false;
    }

    public uniform(name: string): Float32Array | WebGLTexture {
        return null;
    }
}

export default ShaderMaterial;
