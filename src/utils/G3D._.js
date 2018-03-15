const isFunction = f => typeof f === 'function';

const isObject = o => typeof o === 'object';

function match(target, identifyer) {
    if (isFunction(identifyer)) {
        return !!identifyer(target);
    } else {
        for (let k in identifyer) {
            if (identifyer[k] !== target[k]) {
                return false;
            }
        }
        return true;
    }
}

function findIndex(arr, identifyer) {
    for (let i = 0; i < arr.length; i++) {
        if (match(arr[i], identifyer)) {
            return i;
        }
    }
    return -1;
}

function find(arr, identifyer) {
    const i = findIndex(arr, identifyer);
    if (i !== -1) {
        return arr[i];
    } else {
        return null;
    }
}

export default { isFunction, isObject, findIndex, find }