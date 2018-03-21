// ArcRotateCamera is renamed to RotatePerspectiveCamera,
// the API will be deprecated the next major version.

class ArcRotateCamera extends RotatePerspectiveCamera {
    constructor(...args) {
        console.log(
            '[Warning deprecated] ArcRotateCamera is renamed to RotatePerspectiveCamera, the API will be deprecated the next major version.'
        )
        super(...args);
    }
}

export default ArcRotateCamera;