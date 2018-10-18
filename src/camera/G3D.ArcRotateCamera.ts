import RotatePerspectiveCamera from './G3D.RotatePerspectiveCamera';

class ArcRotateCamera extends RotatePerspectiveCamera {
    constructor(scene) {
        console.log(
            '[Deprecation Warning] ArcRotateCamera is renamed to RotatePerspectiveCamera, the ArcRotateCamera class will be removed the next major version.'
        )
        super(scene);
    }
}

export default ArcRotateCamera;