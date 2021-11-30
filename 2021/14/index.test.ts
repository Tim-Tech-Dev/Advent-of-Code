import "mocha";
import { expect } from "chai";
import { main } from "./index";

describe("day14", () => {
    it("should return ???", () => {
        const result = main();
        expect(result).to.equal("Missing!");
    });
});
