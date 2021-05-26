const {
    stringChecker,
    arrayChecker,
    integerChecker,
    floatChecker,
    emailChecker,
} = require('./typeCheck.js');

const supportedTypes = {
    object: '[object Object]',
    array: '[object Array]',
    string: '[object String]',
    integer: '[object Number]',
    float: '[object Number]',
    bool: '[object Boolean]',
    any: 'any',
    email: '[object String]',
};

// define a setter to stop modifications to this object
const handler = {
    // eslint-disable-next-line no-unused-vars
    set(_target, _property, _value) {
        return false;
    },
    get(target, property) {
        return target[property];
    },
};

// Maintain different functions for each data type to check for additional conditions
const typeCheckMap = {
    string: stringChecker,
    array: arrayChecker,
    integer: integerChecker,
    float: floatChecker,
    bool: () => {},
    email: emailChecker,
};
class ObjectChecker {
    constructor() {
        this.supportedTypesMapping = new Proxy(supportedTypes, handler);
        this.supportedTypesMappingKeys = Object.keys(
            this.supportedTypesMapping,
        );
    }

    static getType(any) {
        return Object.prototype.toString.call(any);
    }

    static isObject(object) {
        const type = Object.prototype.toString.call(object);
        return { isObject: type === '[object Object]', type };
    }

    isValidSchema(schema) {
        try {
            const { isObject, type } = this.isObject(schema);
            if (!isObject) {
                return {
                    error: `Schema must be of type Object, got ${type} instead`,
                };
            }
            // eslint-disable-next-line no-restricted-syntax
            for (const [key, value] of Object.entries(schema)) {
                const { isObject: isKeyAnObject, type: keyType } = this.isObject(value);
                if (value.type === 'any') {
                    // eslint-disable-next-line no-continue
                    continue;
                }
                if (
                    !isKeyAnObject
                    || !value.type
                    || !this.supportedTypesMappingKeys.includes(value.type)
                ) {
                    return {
                        error: `Invalid Schema: ${key} is malformed.`,
                    };
                }
            }
            return {
                schema,
            };
        } catch (error) {
            return { error };
        }
    }

    check(object, schema) {
        const validatedSchema = this.isValidSchema(schema);
        const { isObject: isValidObject, type: objectType } = this.isObject(object);
        if (validatedSchema.error || !isValidObject) {
            throw new Error(
                validatedSchema.error
                    || `Argument one is expected to be type Object, but got ${objectType} instead`,
            );
        }
        const schemaKeys = Object.keys(schema);
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(object)) {
            // first check if the key is there in schema and object
            if (!schemaKeys.includes(key)) {
                throw new Error(
                    `Schema does not include a definition for ${key}`,
                );
            }
            const keyType = this.getType(value);
            // compare the keys and the schema to see if it is matching
            const specifiedType = this.supportedTypesMapping[schema[key].type];
            if (specifiedType === 'any') {
                // eslint-disable-next-line no-continue
                continue;
            }
            if (keyType !== specifiedType) {
                throw new Error(
                    `${key} is not of the specified type ${specifiedType}, got ${keyType} instead`,
                );
            }
            if (keyType === '[object Object]') {
                // recursive back to check object's properties
                this.check(value, schema[key].properties);
            } else {
                // check if the value is as specified in schema
                const valueMalformedError = typeCheckMap[schema[key].type]({
                    value,
                    options: schema[key],
                    key,
                    supportedTypes: this.supportedTypesMapping,
                });
                if (valueMalformedError) {
                    throw new Error(valueMalformedError);
                }
            }
        }
        // assume everything is fine since it had passed all checks
        return {
            schema,
            validatedObject: object,
        };
    }
}

module.exports = {
    ObjectChecker,
};
