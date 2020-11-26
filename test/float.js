import { doesNotThrow, throws } from "assert";

import { ObjectChecker } from "../lib/index.js";

describe("Float", function () {
    it("should not throw when presented with valid float", () => {
        doesNotThrow(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    float_key: 50.15,
                },
                {
                    float_key: {
                        type: "float",
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
                    float_key: ["something"],
                },
                {
                    float_key: {
                        type: "float",
                        min_range: 10,
                        max_range: 500,
                    },
                }
            );
        });
        // int is not float
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    float_key: 50,
                },
                {
                    float_key: {
                        type: "float",
                        min_range: 10,
                        max_range: 500,
                    },
                }
            );
        });
    });
    it("should throw when float range is not as per schema", () => {
        // lte
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    float_key: 5.5,
                },
                {
                    float_key: {
                        type: "float",
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
                    float_key: 5000.55,
                },
                {
                    float_key: {
                        type: "float",
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
                float_key: 100.12,
            });
        });
        // invalid schema
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    float_key: 100.12,
                },
                {
                    float_key: "something",
                }
            );
        });
    });
});
