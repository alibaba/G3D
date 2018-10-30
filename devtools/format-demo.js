const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const glob = require('glob');

const jsTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, './template/js.handlebars'), 'utf-8'));
const htmlTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, './template/html.handlebars'), 'utf-8'));

glob.sync(path.join(__dirname, '../demo/*.js')).forEach(item => {

    const name = item.match(/demo\/([0-9a-zA-Z\-]+)\.js/);

    if (name && name[1]) {
        const data = fs.readFileSync(item, 'utf-8');

        if (data.indexOf('G3D_TEMPLATE_GENERATED') !== -1) {
            fs.writeFileSync(
                item,
                jsTemplate({
                    name: name[1],
                    liveReload: true
                })
            );
        }
    }
});

glob.sync(path.join(__dirname, '../demo/*.html')).forEach(item => {

    const name = item.match(/demo\/([0-9a-zA-Z\-]+)\.html/);

    if (name && name[1]) {
        const data = fs.readFileSync(item, 'utf-8');

        if (data.indexOf('G3D_TEMPLATE_GENERATED') !== -1) {
            fs.writeFileSync(
                item,
                htmlTemplate({
                    name: name[1],
                    liveReload: true
                })
            );
        }
    }
});