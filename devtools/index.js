
const path = require('path');
const dalaran = require('dalaran');

const [, , taskName, ...args] = process.argv;

const testRender = args.indexOf('-render') !== -1;
const testCoverage = args.indexOf('-coverage') !== -1;

const tasks = dalaran.libraryTasks({
    umdName: 'G3D',
    demo: './demo',
    entry: './src/index.ts',
    port: 3000,
    loaders: [{
        test: /\.glsl$/,
        use: [
            'raw-loader',
            path.join(__dirname, './glsl-loader.js')
        ]
    }],
    lint: true,
    lintrcDir: path.join(__dirname, './lint-config/'),
    devCors: true,
    headlessMode: !testRender,
    testEntryPattern: 'test/**/*.spec.js',
    coverageFilePattern: testCoverage ? '**/src/**/*.ts' : '',
    liveReload: true,
    typescript: true,
    htmlTemplate: path.join(__dirname, './template/html.handlebars'),
    jsTemplate: path.join(__dirname, './template/js.handlebars'),
    watchTest: false
});


switch (taskName) {

    case 'new':
        tasks.add();
        break;
    case 'test':
        tasks.test();
        break;
    case 'build':
        tasks.build();
        break;
    case 'dev':
    default:
        tasks.dev();
        break;
}