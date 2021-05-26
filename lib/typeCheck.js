const lengthChecker = ({
    value, minLength, maxLength, key,
}) => {
    let error;
    if (maxLength && value.length > maxLength) {
        error = `For ${key}, the given value is longer than the specified maximum length`;
    }
    if (minLength && value.length < minLength) {
        error = `For ${key}, Given value is shorter than the specified minimum length`;
    }
    return error;
};

const rangeChecker = ({
    value, minRange, maxRange, key,
}) => {
    let error;
    // doing typeof because if (0) will be false
    if (typeof minRange === 'number' && value < minRange) {
        error = `For ${key}, the given value is lesser than the specified minimum range`;
    }
    if (typeof maxRange === 'number' && value > maxRange) {
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
        minLength: options.minLength,
        maxLength: options.maxLength,
        key,
    });
    return error;
};

const arrayChecker = ({
    value, options, key, supportedTypes,
}) => {
    let error;
    if (!options) {
        return error;
    }
    error = lengthChecker({
        value,
        minLength: options.minLength,
        maxLength: options.maxLength,
    });
    if (!error && options.elements_type) {
        if (!supportedTypes[options.elements_type]) {
            error = `Unsupported elements_type ${options.elements_type}`;
        } else {
            // check if every item inside arr confirms
            const areValuesGood = value.every(
                (val) => Object.prototype.toString.call(val)
                    === supportedTypes[options.elements_type],
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
            minRange: options.minRange,
            maxRange: options.maxRange,
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
    error = value % 1 !== 0
        ? rangeChecker({
            value,
            minRange: options.minRange,
            maxRange: options.maxRange,
            key,
        })
        : `${key} is not float as specified in schema`;
    return error;
};

const emailChecker = ({ value, options, key }) => {
    let error;
    // run email regex for the value
    const emailRegex = /[A-Za-z\d]+([-._+]?[A-Za-z\d]+)*@[A-Za-z\d]+(-?[A-Za-z\d])*([.][A-Za-z\d]{2,})+/gim;
    const match = emailRegex.exec(value);
    if (!match) {
        error = `${key} is not a valid email address as specified in schema`;
    }
    return error;
};

module.exports = {
    stringChecker,
    arrayChecker,
    integerChecker,
    floatChecker,
    emailChecker,
};
