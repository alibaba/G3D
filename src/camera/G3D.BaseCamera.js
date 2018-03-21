class BaseCamera extends Node {

    center = { x: 0, y: 0, z: 0 };

    up = { x: 0, y: 1, z: 0 };

    constructor() {
        super();
    }
}

export default BaseCamera;