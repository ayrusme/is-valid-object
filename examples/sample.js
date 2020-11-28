import { ObjectChecker } from "../lib/index.js";

const schema = {
    // declare the properties from the other object and describe their type
    first: {
        type: "string",
        // the maximum and the minimum length allowed for the string
        max_length: 25,
        min_length: 1,
    },
    second: {
        type: "integer",
        // the maximum and the minimum range allowed for the number
        min_range: 10,
        max_range: 500,
    },
    third: {
        type: "float",
        // the maximum and the minimum range allowed for the number
        min_range: 10,
        max_range: 500,
    },
    fourth: {
        // schema can recusively iterate objects and validate them
        type: "object",
        // the properties follow the same rules as regular keys
        properties: {
            fifth: {
                type: "string",
            },
            sixth: {
                type: "any",
            },
        },
    },
    eighth: {
        // for arrays, the elements can be validated with the type, minimum and maxiumum arr length
        type: "array",
        min_length: 2,
        max_length: 5,
        elements_type: "integer",
    },
    ninth: {
        // boolean variables can be checked if they're either true or false
        type: "bool",
    },
};

// declare the object which needs to be checked
// this will be in-line with the schema declared earlier
const toBeChecked = {
    first: "this is a string",
    second: 100,
    // beware that 50.0 is still integer and not float in js
    third: 50.52,
    fourth: {
        fifth: "hello string",
        sixth: {
            seventh: "doesn't matter",
        },
    },
    eighth: [1234, 1234, 1234],
    ninth: true,
};

console.time("object-checker");
const checker = new ObjectChecker();
// arg one is the object to be checked and arg two is the schema for that object
// @returns {
//     schema, -> the schema that was sent in the arg two
//     validatedObject: object, -> the same object which was provided as arg one
// }
// the method will throw exceptions with { error: "some message" } if any of the items don't confirm
// to the specified shcema
checker.check(toBeChecked, schema);
console.timeEnd("object-checker");
