const TextureBuilder = {

    createFromHDR: (buffer, material) => {

        const image = HDRParser.parse(buffer);

        console.log(image);

        const texture = new Texture(material);

        texture.image = image.data;

        texture.width = image.shape[0];
        texture.height = image.shape[1];

        return texture;
    }

};

export default TextureBuilder;