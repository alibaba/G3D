const fs = require('fs');
const path = require('path');

function loader(source) {

    const callback = this.async();

    const load = (source, resourcePath, cb) => {

        const lines = source.split('\n');

        let count = 0;

        lines.forEach((line, i) => {

            const reg = /^#\s*include\s*<(.*)>$/;
            const regRes = line.trim().match(reg);

            if (regRes && regRes[1]) {

                const p = path.resolve(path.dirname(resourcePath), regRes[1]);

                count++;

                fs.exists(p, (exits) => {

                    if (exits) {

                        this.addDependency(p);

                        fs.readFile(p, 'utf-8', (err, data) => {

                            if (err) {
                                callback(err);
                            } else {

                                load(data, p, (str) => {

                                    if (err) {
                                        callback(err);
                                    } else {

                                        lines[i] = str;
                                        count--;
                                        check();
                                    }
                                });
                            }
                        });
                    } else {
                        callback(new Error(`${p} does not exits.`));
                    }
                })
            }

        });

        const check = () => {
            if (count === 0) {
                cb(lines.join('\n'));
            }
        }
        check();

    }


    load(source, this.resourcePath, (data) => {
        callback(null, data);
    });

}

module.exports = loader;