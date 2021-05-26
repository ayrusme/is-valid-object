const { doesNotThrow, throws } = require('assert');

const { ObjectChecker } = require('../lib/index.js');

describe('String', () => {
    it('should not throw when presented with valid string', () => {
        doesNotThrow(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    str_key: 'This is a string',
                },
                {
                    str_key: {
                        type: 'string',
                        maxLength: 25,
                        minLength: 1,
                    },
                },
            );
        });
    });
    it('should throw when presented with invalid data type', () => {
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    str_key: ['This is a string'],
                },
                {
                    str_key: {
                        type: 'string',
                        maxLength: 25,
                        minLength: 1,
                    },
                },
            );
        });
    });
    it('should throw when string length is not as per schema', () => {
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    str_key: 'abc',
                },
                {
                    str_key: {
                        type: 'string',
                        maxLength: 25,
                        minLength: 5,
                    },
                },
            );
        });
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    str_key: 'This is a string',
                },
                {
                    str_key: {
                        type: 'string',
                        maxLength: 3,
                        minLength: 1,
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
                str_key: 'string here',
            });
        });
        // invalid schema
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    str_key: 'string here',
                },
                {
                    str_key: 'something',
                },
            );
        });
    });
});
