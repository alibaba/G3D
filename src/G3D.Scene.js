class Scene {

    clearColor = { r: 200, g: 200, b: 200 };
    engine = null;
    activeCamera = null;
    meshes = [];
    lights = [];
    renderManager = new RenderManager(this);

    constructor(engine) {
        this.engine = engine;
    }

    render() {
        this.renderManager.render();
    }

    pick(x, y, flip = true) {

        if (Env.framebufferNotReady) {
            return null;
        }

        if (flip) {
            y = this.engine.height - y;
        }
        const pixels = this.engine.readFramebufferPixel('picker', x, y);
        return [...pixels].map(n => Math.round(n / 16)).reduceRight((n, item) => n * 16 + item, 0);
    }
}

export default Scene;