const { doesNotThrow, throws } = require('assert');

const { ObjectChecker } = require('../lib/index.js');

describe('Array', () => {
    it('should not throw when presented with valid array', () => {
        doesNotThrow(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    arr_key: [1234, 1234, 1234],
                },
                {
                    arr_key: {
                        type: 'array',
                        minLength: 2,
                        maxLength: 5,
                        elements_type: 'integer',
                    },
                },
            );
        });
    });
    it('should throw when presented with invalid array items', () => {
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    arr_key: [1234, 1234, '1234'],
                },
                {
                    arr_key: {
                        type: 'array',
                        minLength: 2,
                        maxLength: 5,
                        elements_type: 'integer',
                    },
                },
            );
        });
    });
    it('should throw when array length does not match schema', () => {
        // check for minLength
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    arr_key: [1234, 1234, 1234],
                },
                {
                    arr_key: {
                        type: 'array',
                        minLength: 4,
                        maxLength: 10,
                        elements_type: 'integer',
                    },
                },
            );
        });
        // check for maxLength
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    arr_key: [1234, 1234, 1234],
                },
                {
                    arr_key: {
                        type: 'array',
                        minLength: 1,
                        maxLength: 2,
                        elements_type: 'integer',
                    },
                },
            );
        });
    });
    it('should throw when presented with no/invalid schema', () => {
        // no schema
        throws(() => {
            const checker = new ObjectChecker();
            checker.check({
                arr_key: [1234, 1234, 1234],
            });
        });
        // invalid schema
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    arr_key: [1234, 1234, 1234],
                },
                {
                    arr_key: 'something',
                },
            );
        });
    });
});
