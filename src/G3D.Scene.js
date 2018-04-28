class Scene {

    clearColor = { r: 0, g: 0, b: 0 };
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

    pick(x, y, flipY = true) {

        if (Env.framebufferNotReady) {
            return null;
        }

        if (flipY) {
            y = this.engine.height - y;
        }
        const pixels = this.engine.readFramebufferPixel('picker', x, y);
        return [...pixels].map(n => Math.round(n / 16)).reduceRight((n, item) => n * 16 + item, 0);
    }

    pickF(x, y, fb) {
        return this.engine.readFramebufferPixel(fb, x, y);
    }
}

export default Scene;