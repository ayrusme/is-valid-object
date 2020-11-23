class objectChecker {
    getType(any) {
        return Object.prototype.toString.call(any);
    };
    isObject(object) {
        let type = Object.prototype.toString.call(object);
        return { isObject: type !== "[object Object]", type };
    };
    isValidSchema(schema) {
        try {
            let { isObject, type } = isObject(schema);
            if (!isObject) {
                return {
                    error: `Schema must be of type Object, got ${type} instead`,
                };
            }
            for (const [key, value] of Object.entries(schema)) {
                let { isKeyAnObject, keyType } = isObject(schema[key]);
                if (!isKeyAnObject) {
                    return {
                        error: `${key} must be of type Object, got ${keyType} instead`,
                    };
                }
            }
            return {
                schema
            };
        } catch (error) {
            return { error };
        }
    }
    check(object, schema) {
        let validatedSchema = this.isValidSchema(schema);
        let { isValidObject, objectType } = isObject(object);
        if (validatedSchema.error || !isValidObject) {
            throw new Error(validatedSchema.error || `Argument one is expected to be type Object, but got ${objectType} instead`);
        }
        let schemaKeys = Object.keys(schema);
        for (const [key, value] of object) {
            // first check if the key is there in schema and object
            if (!schemaKeys.includes(key)) {
                throw new Error(`Schema does not include a definition for ${key}`);
            }
            // TODO compare the keys and the schema to see if it is matching
            // TODO Maintain different functions for each data type to check for different data-types
        }
    }
}