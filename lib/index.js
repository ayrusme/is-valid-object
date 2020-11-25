const supportedTypes = {
  object: "[object Object]",
  array: "[object Array]",
  string: "[object String]",
  integer: "[object Number]",
  float: "[object Number]",
  bool: "[object Boolean]",
};
// define a setter to stop modifications to this object
const handler = {
  set(target, property, value) {
    return false;
  },
  get: function (target, property) {
    return target[property];
  },
};

const supportedTypesMapping = new Proxy(supportedTypes, handler);

const supportedTypesMappingKeys = Object.keys(supportedTypesMapping);

class ObjectChecker {
  getType(any) {
    return Object.prototype.toString.call(any);
  }
  isObject(object) {
    let type = Object.prototype.toString.call(object);
    return { isObject: type === "[object Object]", type };
  }
  // Maintain different functions for each data type to check for different data-types
  #typeCheckMap = {};
  isValidSchema(schema) {
    try {
      let { isObject, type } = this.isObject(schema);
      if (!isObject) {
        return {
          error: `Schema must be of type Object, got ${type} instead`,
        };
      }
      for (const [key, value] of Object.entries(schema)) {
        let { isObject: isKeyAnObject, type: keyType } = this.isObject(value);
        if (
          !isKeyAnObject ||
          !value.type ||
          !supportedTypesMappingKeys.includes(value.type)
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
    let { isObject: isValidObject, type: objectType } = this.isObject(object);
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
        throw new Error(`Schema does not include a definition for ${key}`);
      }
      const keyType = this.getType(value);
      // compare the keys and the schema to see if it is matching
      const specifiedType = supportedTypesMapping[schema[key].type];
      if (keyType !== specifiedType) {
        throw new Error(
          `${key} is not of the specified type ${specifiedType}, got ${keyType} instead`
        );
      }
    }
    // assume everything is fine then since it had passed all checks
    return {
      schema,
      validatedObject: object,
    };
  }
}

module.exports = {
  ObjectChecker,
};
