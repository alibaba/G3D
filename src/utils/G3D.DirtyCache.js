// function DirtyCache(flag, auto) {
//     return function (target, name, descriptor) {

//         const func = target[name];
//         const privateName = '__' + name + 'ResultCache';

//         descriptor.value = function (...args) {
//             if (this[flag]) {
//                 this[privateName] = func.call(this, ...args);
//                 if (auto) {
//                     this[flag] = false;
//                 }
//                 return this[privateName];
//             } else {
//                 return this[privateName];
//             }
//         }
//         return descriptor;
//     }
// }

// export default DirtyCache;