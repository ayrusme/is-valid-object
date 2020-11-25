import { stringChecker, arrayChecker } from "./typeCheck.js";

const supportedTypes = {
    object: "[object Object]",
    array: "[object Array]",
    string: "[object String]",
    integer: "[object Number]",
    float: "[object Number]",
    bool: "[object Boolean]",
    any: "any",
};

// define a setter to stop modifications to this object
const handler = {
    set(_target, _property, _value) {
        return false;
    },
    get: function (target, property) {
        return target[property];
    },
};

// Maintain different functions for each data type to check for additional conditions
const typeCheckMap = {
    string: stringChecker,
    array: arrayChecker,
    integer: (value, options, key) => {
        // TODO integer options implementation
        let error;
        return error;
    },
    float: (value, options, key) => {
        // TODO float options implementation
        let error;
        return error;
    },
    bool: (value, options, key) => {
        // TODO bool options implementation
        let error;
        return error;
    },
};
class ObjectChecker {
    #supportedTypesMapping = new Proxy(supportedTypes, handler);
    #supportedTypesMappingKeys = Object.keys(this.#supportedTypesMapping);
    getType(any) {
        return Object.prototype.toString.call(any);
    }
    isObject(object) {
        let type = Object.prototype.toString.call(object);
        return { isObject: type === "[object Object]", type };
    }
    isValidSchema(schema) {
        try {
            let { isObject, type } = this.isObject(schema);
            if (!isObject) {
                return {
                    error: `Schema must be of type Object, got ${type} instead`,
                };
            }
            for (const [key, value] of Object.entries(schema)) {
                let { isObject: isKeyAnObject, type: keyType } = this.isObject(
                    value
                );
                if (value.type === "any") {
                    continue;
                }
                if (
                    !isKeyAnObject ||
                    !value.type ||
                    !this.#supportedTypesMappingKeys.includes(value.type)
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
        let validatedSchema = this.isValidSchema(schema);
        let { isObject: isValidObject, type: objectType } = this.isObject(
            object
        );
        if (validatedSchema.error || !isValidObject) {
            throw new Error(
                validatedSchema.error ||
                    `Argument one is expected to be type Object, but got ${objectType} instead`
            );
        }
        let schemaKeys = Object.keys(schema);
        for (const [key, value] of Object.entries(object)) {
            // first check if the key is there in schema and object
            if (!schemaKeys.includes(key)) {
                throw new Error(
                    `Schema does not include a definition for ${key}`
                );
            }
            const keyType = this.getType(value);
            // compare the keys and the schema to see if it is matching
            const specifiedType = this.#supportedTypesMapping[schema[key].type];
            if (specifiedType === "any") {
                continue;
            }
            if (keyType !== specifiedType) {
                throw new Error(
                    `${key} is not of the specified type ${specifiedType}, got ${keyType} instead`
                );
            }
            if (keyType === "[object Object]") {
                // recursive back to check object's properties
                this.check(value, schema[key].properties);
            } else {
                // check if the value is as specified in schema
                let valueMalformedError = typeCheckMap[schema[key].type]({
                    value,
                    options: schema[key],
                    key,
                    supportedTypes: this.#supportedTypesMapping,
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

export { ObjectChecker };
