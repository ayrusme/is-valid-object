const { doesNotThrow, throws } = require('assert');

const { ObjectChecker } = require('../lib/index.js');

describe('Email', () => {
    it('should not throw when presented with valid email', () => {
        doesNotThrow(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    email_key: 'abc@abc.com',
                },
                {
                    email_key: {
                        type: 'email',
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
                    email_key: ['abc@abc.com'],
                },
                {
                    email_key: {
                        type: 'email',
                    },
                },
            );
        });
    });
    it('should throw when presented with invalid email', () => {
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    email_key: 'abc',
                },
                {
                    email_key: {
                        type: 'email',
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
                email_key: 'abc@abc.com',
            });
        });
        // invalid schema
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    email_key: 'abc@abc.com',
                },
                {
                    email_key: 'something',
                },
            );
        });
    });
});
