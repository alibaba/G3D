// function DirtyCheck(propertyList, flag, instance) {

//     return function (clazzOrProperty, name, descriptor) {

//         if (typeof clazzOrProperty === 'function') {
//             const Clazz = clazzOrProperty;
//             class DirtyCheck extends Clazz {
//                 constructor(...args) {
//                     super(...args);
//                     propertyList.forEach((prop) => {
//                         let value = this[prop];
//                         Object.defineProperty(this, prop, {
//                             get: function () {
//                                 return value;
//                             },
//                             set: function (v) {
//                                 value = v;
//                                 if (_.isFunction(flag)) {
//                                     flag.call(this);
//                                 } else {
//                                     this[flag] = true;
//                                 }
//                                 return true;
//                             }
//                         });
//                     });
//                     if (!_.isFunction(flag)) {
//                         this[flag] = true;
//                     }
//                 }
//             }
//             return DirtyCheck;
//         } else {
//             const target = clazzOrProperty;
//             instance[flag] = true;
//             return new Proxy(target, {
//                 set: function (obj, prop, value) {
//                     obj[prop] = value;
//                     if (propertyList.indexOf(prop) !== -1) {
//                         instance[flag] = true;
//                     }
//                     return true;
//                 }
//             })
//         }
//     }
// }

// export default DirtyCheck;

// // spec

// @DirtyCheck(['foo', 'bar'], 'ok')
// class Foo {
//     foo = 1;
//     bar = 2;

//     obj = DirtyCheck(['x', 'y', 'z'], 'ok', this)({ x: 1, y: 2, z: 1 });

//     @DirtyCache('ok')
//     getValue() {
//         console.log('get value');
//         return 'hello';
//     }
// }