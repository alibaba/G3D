import loader from './loader';

const prefix = '//g.alicdn.com/gama/assets/0.0.11/assets/pbr';

function loadAssets(envName, callback) {

    const faces = ['left', 'right', 'top', 'bottom', 'front', 'back'];
    const faceDes = ['negx', 'posx', 'posy', 'negy', 'posz', 'negz'];

    loadSpecular(function (df) {
        loadDiffuse(function (sp) {
            loadBRDFLUT(function (lut) {
                callback(df, sp, lut);
            })
        })
    });

    function loadSpecular(callback) {
        const specularImages = {};
        faces.forEach((face, j) => {
            for (let i = 0; i < 9; i++) {
                // specularImages[face + '_' + i] = `//g.alicdn.com/gama/assets/0.0.8/assets/pbr/specular/specular_${face}_${i}.jpg`;
                specularImages[face + '_' + i] = `${prefix}/${envName}/output_pmrem_${faceDes[j]}_${i}_${Math.pow(2, 8 - i)}x${Math.pow(2, 8 - i)}.jpg`;
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

        faces.forEach((face, j) => {
            // diffuseImages[face] = `http://g.alicdn.com/gama/assets/0.0.8/assets/pbr/diffuse/diffuse_${face}_0.jpg`;
            diffuseImages[face] = `${prefix}/${envName}/output_iem_${faceDes[j]}.jpg`;
        });

        loader.loadImageQueue({
            ...diffuseImages
        }, function (images) {

            callback(images);
        })

    }

    function loadBRDFLUT(callback) {
        loader.loadImage('//img.alicdn.com/tfs/TB1yCjuoDtYBeNjy1XdXXXXyVXa-256-256.png', callback);
    }
}

const pbrAssets = (envName = 'apartment') => {

    // envName could be:

    const envList = ['apartment', 'office', 'emptyroom', 'backlot'];
    if (envList.indexOf(envName) === -1) {
        console.log('envmap ' + envName + ' not exits, fallback to apartment');
        envName = 'apartment';
    }

    return {
        ready: callback => {
            loadAssets(envName, callback)
        }
    }

}



export default pbrAssets;