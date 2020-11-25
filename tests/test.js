import { ObjectChecker } from "../lib/index.js";

const toBeChecked = {
    first: "this is a string",
    second: 100,
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

const schema = {
    first: {
        type: "string",
        max_length: 25,
        min_length: 1,
    },
    second: {
        type: "integer",
        lower_range: 10,
        upper_range: 50,
    },
    third: {
        type: "float",
        lower_range: 10,
        upper_range: 50,
    },
    fourth: {
        type: "object",
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
        type: "array",
        min_length: 2,
        max_length: 5,
        elements_type: "integer",
    },
    ninth: {
        type: "bool",
    },
};

console.time("object-checker");
const checker = new ObjectChecker();
checker.check(toBeChecked, schema);
console.timeEnd("object-checker");
