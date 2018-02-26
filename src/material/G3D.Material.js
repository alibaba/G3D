class Material {
    static COLOR = 1;
    static TEXTURE = 2;
    opacity = 1.0;

    offset = {
        x: 0,
        y: 0
    }

    getOpacity() {
        return this.opacity;
    }

    getOffset() {
        return new Float32Array([this.offset.x, this.offset.y]);
    }
}

export default Material;