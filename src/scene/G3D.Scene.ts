import Env from '../core/G3D.Env';
import RenderManager from '../rendering/G3D.RenderManager';
import { IColorRGB } from '../types/raw';
import Engine from '../core/G3D.Engine';
import BasePerspectiveCamera from '../camera/G3D.BasePerspectiveCamera';
import BaseOrthographicCamera from '../camera/G3D.BaseOrthographicCamera';
import BaseMesh from '../mesh/G3D.BaseMesh';


class Scene {

    clearColor: IColorRGB = { r: 51, g: 51, b: 76 };

    engine: Engine;
    activeCamera: BasePerspectiveCamera | BaseOrthographicCamera;
    renderManager: RenderManager = new RenderManager(this);

    meshes: BaseMesh[] = [];
    lights = [];

    skybox: any;

    constructor(engine) {
        this.engine = engine;
        this.engine.currentScene = this;
    }

    render() {
        this.renderManager.render();
    }

    pick(x, y, flipY = true) {

        if (Env.framebufferNotReady) {
            return null;
        }

        if (flipY) {
            y = this.engine.height - y;
        }
        const pixels = this.engine.readFramebufferPixel('picker', x, y);
        const pixel = [pixels[0], pixels[1], pixels[2], pixels[3]];
        return pixel.map(n => Math.round(n / 16)).reduceRight((n, item) => n * 16 + item, 0);
    }
}

export default Scene;