const { doesNotThrow, throws } = require("assert");

const { ObjectChecker } = require("../lib/index.js");

describe("Integer", function () {
    it("should not throw when presented with valid int", () => {
        doesNotThrow(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    int_key: 50,
                },
                {
                    int_key: {
                        type: "integer",
                        min_range: 10,
                        max_range: 500,
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
                    int_key: ["something"],
                },
                {
                    int_key: {
                        type: "integer",
                        min_range: 10,
                        max_range: 500,
                    },
                }
            );
        });
        // float is technically not integer
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    int_key: 50.1,
                },
                {
                    int_key: {
                        type: "integer",
                        min_range: 10,
                        max_range: 500,
                    },
                }
            );
        });
    });
    it("should throw when integer range is not as per schema", () => {
        // lte
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    int_key: 5,
                },
                {
                    int_key: {
                        type: "integer",
                        min_range: 10,
                        max_range: 500,
                    },
                }
            );
        });
        // gte
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    int_key: 5000,
                },
                {
                    int_key: {
                        type: "integer",
                        min_range: 10,
                        max_range: 500,
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
                int_key: 100,
            });
        });
        // invalid schema
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    int_key: 100,
                },
                {
                    int_key: "something",
                }
            );
        });
    });
});
