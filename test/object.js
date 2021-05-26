const { doesNotThrow, throws } = require("assert");

const { ObjectChecker } = require("../lib/index.js");

describe("Object", function () {
    it("should not throw when presented with valid object", () => {
        doesNotThrow(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    obj_key: {
                        first_key: "This is a string",
                        second_key: {
                            third_key: 50,
                            fourth_key: {
                                fifth_key: "doesn't matter",
                            },
                        },
                    },
                },
                {
                    obj_key: {
                        type: "object",
                        properties: {
                            first_key: {
                                type: "string",
                            },
                            second_key: {
                                type: "object",
                                properties: {
                                    third_key: {
                                        type: "integer",
                                        min_range: 10,
                                        max_range: 500,
                                    },
                                    fourth_key: {
                                        type: "object",
                                        properties: {
                                            fifth_key: {
                                                type: "any",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                }
            );
        });
    });
    it("should throw when presented with an invalid object", () => {
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    obj_key: "This is a string",
                },
                {
                    obj_key: {
                        type: "object",
                        properties: {
                            first_key: {
                                type: "string",
                            },
                        },
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
                obj_key: {
                    first_key: "This is a string",
                    second_key: {
                        third_key: 50,
                        fourth_key: {
                            fifth_key: "doesn't matter",
                        },
                    },
                },
            });
        });
        // invalid schema
        throws(() => {
            const checker = new ObjectChecker();
            checker.check(
                {
                    obj_key: {
                        first_key: "This is a string",
                        second_key: {
                            third_key: 50,
                            fourth_key: {
                                fifth_key: "doesn't matter",
                            },
                        },
                    },
                },
                {
                    obj_key: "something",
                }
            );
        });
    });
});
