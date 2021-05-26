const { doesNotThrow, throws } = require("assert");

const { ObjectChecker } = require("../lib/index.js");

describe("Boolean", function () {
    it("should not throw when presented with valid data type", () => {
        doesNotThrow(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    bool_key: false,
                },
                {
                    bool_key: {
                        type: "bool",
                    },
                }
            );
        });
    });
    it("should throw when presented with invalid data type", () => {
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    bool_key: [1234, 1234, "1234"],
                },
                {
                    bool_key: {
                        type: "bool",
                    },
                }
            );
        });
    });
    it("should throw when presented with no/invalid schema", () => {
        // no schema
        throws(() => {
            const checker = new ObjectChecker();
            checker.check({
                bool_key: true,
            });
        });
        // invalid schema
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    bool_key: true,
                },
                {
                    bool_key: "something",
                }
            );
        });
    });
});
