const gulp = require('gulp');
const glob = require('glob');
const webpack = require('webpack');
const tasksFactory = require('dalaran');
const path = require('path');

const providePluginOptions = {};
glob.sync('src/**/G3D.*.js').forEach(item => {
    const name = item.split('.')[1];
    providePluginOptions[name] = path.join(__dirname, item);
});

const libraryTasks = tasksFactory.libraryTasks({
    umdName: 'G3D',
    demo: './pages',
    entry: './src/G3D.js',
    port: 3000,
    loaders: [{
        test: /\.glsl$/,
        use: 'raw-loader'
    }],
    plugins: [
        new webpack.ProvidePlugin(providePluginOptions)
    ],
    devCors: true,
    testEntryPattern: 'test/**/*.spec.js'
});


gulp.task('test', libraryTasks.test);

gulp.task('dev', libraryTasks.dev);

gulp.task('build', libraryTasks.build);
