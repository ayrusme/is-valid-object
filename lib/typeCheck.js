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

const rangeChecker = ({ value, min_range, max_range, key }) => {
    let error;
    // doing typeof because if (0) will be false
    if (typeof min_range === "number" && value < min_range) {
        error = `For ${key}, the given value is lesser than the specified minimum range`;
    }
    if (typeof max_range === "number" && value > max_range) {
        error = `For ${key}, Given value is greater than the specified maximum range`;
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

const integerChecker = ({ value, options, key }) => {
    let error;
    if (!options) {
        return error;
    }
    // check if value is definitely integer
    // otherwise check range
    error = Number.isSafeInteger(value)
        ? rangeChecker({
              value,
              min_range: options.min_range,
              max_range: options.max_range,
              key,
          })
        : `${key} is not an integer as specified in schema`;
    return error;
};

const floatChecker = ({ value, options, key }) => {
    let error;
    if (!options) {
        return error;
    }
    // check if value is definitely integer
    // otherwise check range
    error =
        value % 1 !== 0
            ? rangeChecker({
                  value,
                  min_range: options.min_range,
                  max_range: options.max_range,
                  key,
              })
            : `${key} is not float as specified in schema`;
    return error;
};

module.exports = { stringChecker, arrayChecker, integerChecker, floatChecker };
