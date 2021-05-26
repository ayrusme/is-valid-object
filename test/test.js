/* eslint-disable no-console */
// I use this file to test the class whenever I make changes to the class

const { ObjectChecker } = require('../lib/index.js');

const toBeChecked = {
    first: 'this is a string',
    second: 100,
    third: 50.52,
    fourth: {
        fifth: 'hello string',
        sixth: {
            seventh: "doesn't matter",
        },
    },
    eighth: [1234, 1234, 1234],
    ninth: true,
};

const schema = {
    first: {
        type: 'string',
        maxLength: 25,
        minLength: 1,
    },
    second: {
        type: 'integer',
        minRange: 10,
        maxRange: 500,
    },
    third: {
        type: 'float',
        minRange: 10,
        maxRange: 500,
    },
    fourth: {
        type: 'object',
        properties: {
            fifth: {
                type: 'string',
            },
            sixth: {
                type: 'any',
            },
        },
    },
    eighth: {
        type: 'array',
        minLength: 2,
        maxLength: 5,
        elements_type: 'integer',
    },
    ninth: {
        type: 'bool',
    },
};

console.time('object-checker');
const checker = new ObjectChecker();
checker.check(toBeChecked, schema);
console.timeEnd('object-checker');
