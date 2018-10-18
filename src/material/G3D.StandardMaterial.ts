import PhongMaterial from './G3D.PhongMaterial';

class StandardMaterial extends PhongMaterial {

    constructor() {
        console.log(
            '[Deprecation Warning] StandardMaterial is renamed to PhongMaterial, the StandardMaterial class will be removed the next major version.'
        )
        super();
    }

}

export default StandardMaterial;