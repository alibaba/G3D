import BaseOrthographicCamera from "../camera/base-orthographic-camera";
import BasePerspectiveCamera from "../camera/base-perspective-camera";
import Engine from "../core/engine";
import BaseLight from "../light/base-light";
import BaseMesh from "../mesh/base-mesh";
import RenderManager from "../rendering/render-manager";
import { IColorRGB } from "../types/raw";
import Skybox from "./skybox";

class Scene {

    public engine: Engine;

    public clearColor: IColorRGB = { r: 51, g: 51, b: 76 };
    public activeCamera: BasePerspectiveCamera | BaseOrthographicCamera;
    public renderManager: RenderManager = new RenderManager(this);

    public meshes: BaseMesh[] = [];
    public lights: BaseLight[] = [];
    public skybox: Skybox;

    constructor(engine: Engine) {
        this.engine = engine;
        this.engine.currentScene = this;
    }

    public render(): void {
        this.renderManager.render();
    }

    public pick(x: number, y: number): number {
        const pixels = this.engine.readFramebufferPixel("picker", x, y);
        const pixel = [pixels[0], pixels[1], pixels[2], pixels[3]];
        return pixel.map((n) => Math.round(n / 16)).reduceRight((n, item) => n * 16 + item, 0);
    }
}

export default Scene;
