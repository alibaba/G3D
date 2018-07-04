class StandardMaterial extends PhongMaterial {

    constructor(...args) {
        console.log(
            '[Deprecation Warning] StandardMaterial is renamed to PhongMaterial, the StandardMaterial class will be removed the next major version.'
        )
        super(...args);
    }

}

export default StandardMaterial;