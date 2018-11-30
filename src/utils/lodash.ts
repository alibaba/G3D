const isFunction = (f) => typeof f === "function";

function match(target, identifyer) {
    if (isFunction(identifyer)) {
        return !!identifyer(target);
    } else {
        for (const k in identifyer) {
            if (identifyer[k] !== target[k]) {
                return false;
            }
        }
        return true;
    }
}

export function findIndex(arr, identifyer) {
    for (let i = 0; i < arr.length; i++) {
        if (match(arr[i], identifyer)) {
            return i;
        }
    }
    return -1;
}

export function find(arr, identifyer) {
    const i = findIndex(arr, identifyer);
    if (i !== -1) {
        return arr[i];
    } else {
        return null;
    }
}
