
const path = require('path');
const dalaran = require('dalaran');
const tasks = dalaran.libraryTasks({
    umdName: 'G3D',
    demo: './demo',
    entry: './src/G3D.ts',
    port: 3000,
    loaders: [{
        test: /\.glsl$/,
        use: [
            'raw-loader',
            path.join(__dirname, './glsl-loader.js')
        ]
    }],
    devCors: true,
    testEntryPattern: 'test/**/*.spec.js',
    liveReload: true,
    typescript: true,
    htmlTemplate: './demo/template/html.handlebars',
    jsTemplate: './demo/template/js.handlebars'
});

const taskName = process.argv[2];

switch (taskName) {

    case 'build':
        tasks.build();
        break;
    case 'dev':
    default:
        tasks.dev();
        break;
}

