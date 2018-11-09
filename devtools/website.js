const path = require('path');
const fs = require('fs-extra');
const pug = require('pug');
const less = require('less');
const yaml = require('yaml-js');
const marked = require('marked');

const sourceDir = path.join(__dirname, '../website/homepage-src/');
const docDir = path.join(__dirname, '../doc/');
const destDir = path.join(__dirname, '../website/homepage-dist/');
const destDirCn = path.join(destDir, 'cn/');

new Promise((resolve) => {

    // homepage

    const templates = {
        index: pug.compile(
            fs.readFileSync(sourceDir + 'template/index.pug', 'utf-8'),
            {
                filename: sourceDir + 'template/index.pug',
                pretty: true
            }
        ),
        doc: pug.compile(
            fs.readFileSync(sourceDir + 'template/doc.pug'),
            {
                filename: sourceDir + 'template/doc.pug',
                pretty: true
            }
        )
    }

    const siteInfo = yaml.load(fs.readFileSync(sourceDir + 'site.yaml'));
    const siteInfoCn = yaml.load(fs.readFileSync(sourceDir + 'site.zh.yaml'));

    fs.outputFileSync(destDir + 'index.html', templates.index({ root: './', langcn: false, ...siteInfo }));
    fs.outputFileSync(destDirCn + 'index.html', templates.index({ root: './', langcn: true, ...siteInfoCn }));

    const docs = yaml.load(fs.readFileSync(sourceDir + 'doc.yaml')).docs;
    const docsPatchCn = yaml.load(fs.readFileSync(sourceDir + 'doc.patch.cn.yaml')).docs;

    function deal(root, k, scope) {

        const target = root[k];

        if (typeof target === 'string') {

            console.log(docDir, scope, k);

            const content = fs.readFileSync(`${docDir}/${scope}/${k}.md`, 'utf-8') || '  ';
            const contentcn = fs.existsSync(`${docDir}/${scope}/${k}.cn.md`) ?
                fs.readFileSync(`${docDir}/${scope}/${k}.cn.md`, 'utf-8') : content;

            if (content) {

                let html = templates.doc(
                    {
                        index: docs[scope],
                        indexcn: docsPatchCn[scope],
                        content: marked(content),
                        root: '../',
                        langcn: false,
                        ...siteInfo
                    }
                );

                let htmlcn = templates.doc(
                    {
                        index: docs[scope],
                        indexcn: docsPatchCn[scope],
                        content: marked(contentcn),
                        root: '../',
                        langcn: true,
                        ...siteInfoCn
                    }
                );

                fs.outputFileSync(`${destDir}/${scope}/${k.split(' ').join('-')}.html`, html);
                fs.outputFileSync(`${destDirCn}/${scope}/${k.split(' ').join('-')}.html`, htmlcn);

            } else {
                throw new Error('Read source file failed.');
            }
        } else {

            for (let tk in target) {
                deal(target, tk, scope);
            }
        }
    }

    deal(docs, 'api', 'api');
    deal(docs, 'guide', 'guide');

    resolve();

}).then(() => {

    // style

    return new Promise((resolve) => {

        const lessStr = fs.readFileSync(sourceDir + '/style/index.less', 'utf-8');

        less.render(
            lessStr,
            { filename: sourceDir + '/style/index.less' },
            (err, output) => {

                fs.outputFileSync(destDir + 'index.css', output.css);
                fs.outputFileSync(destDirCn + 'index.css', output.css);

                resolve();
            }
        )

    });

}).then(() => {

    // assets

    return new Promise(resolve => {

        fs.copySync(sourceDir + 'assets', destDir + 'assets', { overwrite: true });
        fs.copySync(sourceDir + 'assets', destDirCn + 'assets', { overwrite: true });

        resolve();

    })


});






// fs.writeFileSync('./website/homepage/index.html', templates.index(option));

// const doc = yaml.load(fs.readFileSync('./website/homepage-src/doc.yaml')).doc;

// Object.keys(doc).forEach(scope => {

//     function deal(docs, k) {
//         if (typeof docs === 'string') {
//             const content = fs.readFileSync(`./doc/${scope}/${k}.md`, 'utf-8');

//             if (content) {

//                 let html = templates.doc(
//                     {
//                         index: doc[scope],
//                         content: marked(content),
//                         root: '../'
//                     }
//                 );
//                 fs.outputFileSync(`./website/homepage/${scope.split('-').join('/')}/${k}.html`, html);
//             } else {
//                 throw new Error('Read source file failed, please run gulp fetch first.');
//             }
//         } else {
//             for (let key in docs) {
//                 deal(docs[key], key, docs);
//             }
//         }
//     }

//     deal(doc[scope]);
// });

// return gulp.src('./website/homepage/*/*.html')
//     .pipe(highlight())
//     .pipe(gulp.dest('./website/homepage/'));


// function lessTask() {
//     return gulp.src('./website/homepage-src/style/index.less')
//         .pipe(less())
//         .pipe(gulp.dest('./website/homepage'));
// }


// function assets() {
//     return gulp.src('./website/homepage-src/assets/**')
//         .pipe(gulp.dest('./website/homepage/assets/'));
// }
