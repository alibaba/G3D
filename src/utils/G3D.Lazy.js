function Lazy(source = [], dist = [], flag = '__isDirty__') {

    return function (Clazz) {

        class Lazyed extends Clazz {

            constructor(...args) {
                super(...args);

                const patch = (key, target, siblings) => {

                    const [k1, ...k2] = key.split('.');

                    if (k2.length !== 0) {

                        patch(
                            k2.join('.'),
                            target[k1],
                            siblings.filter(item => item.startsWith(k2.join('.') + '.'))
                                .map(item => item.substr(k2.length + 1))
                        );

                    } else {

                        const oriValue = target[k1];

                        const k = '__' + k1 + '__';
                        target[k] = oriValue;

                        Object.defineProperty(target, k1, {
                            get: () => {
                                return target[k];
                            },
                            set: (value) => {
                                if (_.isObject(oriValue) && _.isObject(value)) {
                                    siblings.forEach(ks => {
                                        patch(
                                            ks,
                                            value,
                                            siblings.filter(item => item.startsWith(ks + '.'))
                                                .map(item => item.substr(ks.length + 1))
                                        )
                                    });
                                }
                                target[k] = value;
                                this[flag] = true;
                            }
                        });
                    }
                }

                source.forEach(key => {

                    patch(
                        key,
                        this,
                        source.filter(item => item.startsWith(key + '.'))
                            .map(item => item.substr(key.length + 1))
                    );
                });

                dist.forEach(key => {

                    const resultKey = '__' + key + '_' + 'result' + '__';
                    const functionKey = '__' + key + '__';

                    this[functionKey] = this[key];
                    this[key] = (...args) => {
                        if (this[flag]) {
                            dist.forEach(k => {
                                const resultKey = '__' + k + '_' + 'result' + '__';
                                const functionKey = '__' + k + '__';
                                this[resultKey] = this[functionKey](...args);
                            })
                            this[flag] = false;
                        }
                        return this[resultKey];
                    }
                })

                this[flag] = true;
            }
        }

        return Lazyed;
    }
}

export default Lazy;