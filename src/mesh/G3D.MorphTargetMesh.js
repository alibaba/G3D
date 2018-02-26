class MorphTargetMesh extends Mesh {

    morphTargetsGeometries = [];
    cycleDuration = 1000;

    constructor(...args) {
        super(...args);
    }

    getMorphPhaseInfo() {
        const phase = (Date.now() / this.cycleDuration) % 1;
        const d = 1 / this.morphTargetsGeometries.length;
        const before = Math.floor(phase / d);
        let after = Math.ceil(phase / d);
        if (after === this.morphTargetsGeometries.length) {
            after = 0;
        }
        return {
            before, after,
            phase: phase / d - before
        }
    }
}

export default MorphTargetMesh;