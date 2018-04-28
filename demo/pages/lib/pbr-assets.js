import loader from './loader';


function loadAssets(callback) {

    const faces = ['left', 'right', 'top', 'bottom', 'front', 'back'];

    loadSpecular(function (df) {
        loadDiffuse(function (sp) {
            callback(df, sp);
        })
    });

    function loadSpecular(callback) {
        const specularImages = {};
        faces.forEach(face => {
            for (let i = 0; i < 10; i++) {
                specularImages[face + '_' + i] = `//g.alicdn.com/gama/assets/0.0.8/assets/pbr/specular/specular_${face}_${i}.jpg`;
            }
        });

        loader.loadImageQueue({
            ...specularImages
        }, images => {

            const data = { mip: [] };

            Object.keys(images).forEach(k => {
                let [f, i] = k.split('_');
                i = Number(i);
                if (i === 0) {
                    data[f] = images[k];
                } else {
                    if (data.mip[i - 1] === undefined) {
                        data.mip[i - 1] = {};
                    }
                    data.mip[i - 1][f] = images[k]
                }
            });

            callback(data);

        });
    }

    function loadDiffuse(callback) {

        const diffuseImages = {};

        faces.forEach(face => {
            diffuseImages[face] = `http://g.alicdn.com/gama/assets/0.0.8/assets/pbr/diffuse/diffuse_${face}_0.jpg`;
        });

        loader.loadImageQueue({
            ...diffuseImages
        }, function (images) {

            callback(images);
        })

    }
}


const pbrAssets = {
    ready: (callback) => {
        loadAssets(callback);
    }
};

export default pbrAssets;