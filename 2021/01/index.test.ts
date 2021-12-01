import "mocha";
import { expect } from "chai";
import { main } from "./index";

describe("day01", () => {
    it("should return 7 and 5", () => {
        const result = main(`199
        200
        208
        210
        200
        207
        240
        269
        260
        263
        `);
        expect(result[0]).to.equal(7);
        expect(result[1]).to.equal(5);
    });
});
