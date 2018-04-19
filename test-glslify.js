var glsl = require('glslify');

var str = glsl('./a.glsl', {
    basedir: __dirname
})

console.log(str);