class ArcRotateCamera extends RotatePerspectiveCamera {
    constructor(...args) {
        console.log(
            '[Deprecation Warning] ArcRotateCamera is renamed to RotatePerspectiveCamera, the ArcRotateCamera class will be removed the next major version.'
        )
        super(...args);
    }
}

export default ArcRotateCamera;