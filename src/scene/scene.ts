import RenderManager from '../rendering/render-manager';
import { IColorRGB } from '../types/raw';
import Engine from '../core/engine';
import BasePerspectiveCamera from '../camera/base-perspective-camera';
import BaseOrthographicCamera from '../camera/base-orthographic-camera';
import BaseMesh from '../mesh/base-mesh';
import Skybox from './skybox';
import BaseLight from '../light/base-light';

class Scene {

    engine: Engine;

    clearColor: IColorRGB = { r: 51, g: 51, b: 76 };
    activeCamera: BasePerspectiveCamera | BaseOrthographicCamera;
    renderManager: RenderManager = new RenderManager(this);

    meshes: BaseMesh[] = [];
    lights: BaseLight[] = [];
    skybox: Skybox;

    constructor(engine: Engine) {
        this.engine = engine;
        this.engine.currentScene = this;
    }

    render(): void {
        this.renderManager.render();
    }

    pick(x: number, y: number): number {
        const pixels = this.engine.readFramebufferPixel('picker', x, y);
        const pixel = [pixels[0], pixels[1], pixels[2], pixels[3]];
        return pixel.map(n => Math.round(n / 16)).reduceRight((n, item) => n * 16 + item, 0);
    }
}

export default Scene;