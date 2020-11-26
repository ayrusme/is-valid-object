import { doesNotThrow, throws } from "assert";

import { ObjectChecker } from "../lib/index.js";

describe("Array", function () {
    it("should not throw when presented with valid array", () => {
        doesNotThrow(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    arr_key: [1234, 1234, 1234],
                },
                {
                    arr_key: {
                        type: "array",
                        min_length: 2,
                        max_length: 5,
                        elements_type: "integer",
                    },
                }
            );
        });
    });
    it("should throw when presented with invalid array items", () => {
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    arr_key: [1234, 1234, "1234"],
                },
                {
                    arr_key: {
                        type: "array",
                        min_length: 2,
                        max_length: 5,
                        elements_type: "integer",
                    },
                }
            );
        });
    });
    it("should throw when array length does not match schema", () => {
        // check for min_length
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    arr_key: [1234, 1234, 1234],
                },
                {
                    arr_key: {
                        type: "array",
                        min_length: 4,
                        max_length: 10,
                        elements_type: "integer",
                    },
                }
            );
        });
        // check for max_length
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    arr_key: [1234, 1234, 1234],
                },
                {
                    arr_key: {
                        type: "array",
                        min_length: 1,
                        max_length: 2,
                        elements_type: "integer",
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
                    arr_key: "something",
                }
            );
        });
    });
});
