const loader = (function () {
    function loadBlob(url, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                if (xmlhttp.status === 200) {
                    callback(xmlhttp.response);
                } else if (xmlhttp.status == 400) {
                    throw new Error('There was an error 400');
                } else {
                    throw new Error('something else other than 200 was returned');
                }
            }
        };
        xmlhttp.open('GET', url, true);
        xmlhttp.responseType = 'arraybuffer';
        xmlhttp.send();
    }

    function loadText(url, callback) {

        var xmlhttp = new XMLHttpRequest();


        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    callback(xmlhttp.responseText);
                } else if (xmlhttp.status == 400) {
                    throw new Error('There was an error 400');
                } else {
                    throw new Error('something else other than 200 was returned');
                }
            }
        };

        xmlhttp.open('GET', url, true);
        // xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xmlhttp.send();
    }

    function loadImage(url, callback) {

        const image = new Image();
        image.crossOrigin = true;

        image.onload = function () {
            callback(image);
        };

        image.src = url;
    }

    function loadImageQueue(urlMap, callback) {

        const len = Object.keys(urlMap).length;

        const imageMap = {};
        let i = 0;

        Object.keys(urlMap).forEach((k) => {

            const url = urlMap[k];

            loadImage(url, (image) => {

                imageMap[k] = image;

                i++;

                if (i === len) {
                    callback(imageMap);
                }

            })

        })
    }

    function loadTextQueue(urls, callback) {

        let loadCount = 0;
        const res = [];

        urls.forEach((url, i) => {


            loadText(url, text => {
                res[i] = text;
                loadCount++;

                if (loadCount === urls.length) {
                    callback(res);
                }

            });
        });
    }

    return { loadText, loadImage, loadBlob, loadImageQueue, loadTextQueue };
})();
function pbrAssets() {

    const prefix = '//g.alicdn.com/gama/assets/0.0.19/assets/pbr';

    function loadAssets(callback) {

        const faces = ['left', 'right', 'top', 'bottom', 'front', 'back'];

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
                    specularImages[face + '_' + i] = `${prefix}/specular/specular_${face}_${i}.jpg`;
                }
            });

            loader.loadImageQueue({
                specularImages
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
                diffuseImages[face] = `http://g.alicdn.com/gama/assets/0.0.8/assets/pbr/diffuse/diffuse_${face}_0.jpg`;
            });

            loader.loadImageQueue({ diffuseImages }, function (images) { callback(images); })
        }

        function loadBRDFLUT(callback) {
            loader.loadImage('http://img.alicdn.com/tfs/TB1yCjuoDtYBeNjy1XdXXXXyVXa-256-256.png', callback);
        }
    }

    return {
        ready: callback => {
            loadAssets(envName, callback)
        }
    }
}
