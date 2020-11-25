const lengthChecker = ({ value, min_length, max_length, key }) => {
    let error;
    if (max_length && value.length > max_length) {
        error = `For ${key}, the given value is longer than the specified maximum length`;
    }
    if (min_length && value.length < min_length) {
        error = `For ${key}, Given value is shorter than the specified minimum length`;
    }
    return error;
};

const stringChecker = ({ value, options, key }) => {
    let error;
    if (!options) {
        return error;
    }
    error = lengthChecker({
        value,
        min_length: options.min_length,
        max_length: options.max_length,
        key,
    });
    return error;
};

const arrayChecker = ({ value, options, key, supportedTypes }) => {
    let error;
    if (!options) {
        return error;
    }
    error = lengthChecker({
        value,
        min_length: options.min_length,
        max_length: options.max_length,
    });
    if (!error && options.elements_type) {
        if (!supportedTypes[options.elements_type]) {
            error = `Unsupported elements_type ${options.elements_type}`;
        } else {
            // check if every item inside arr confirms
            let areValuesGood = value.every(
                (val) =>
                    Object.prototype.toString.call(val) ===
                    supportedTypes[options.elements_type]
            );
            if (!areValuesGood) {
                error = `Unsupported elements found in the array ${key}`;
            }
        }
    }
    return error;
};

export { stringChecker, arrayChecker };
