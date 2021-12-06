import "mocha";
import { expect } from "chai";
import { stage } from "./index";

describe("day06", () => {
    it("Not defiend yet", () => {
        const input = [3, 4, 3, 1, 2];
        expect(stage(input, 18)).to.equal(26);
        expect(stage(input, 80)).to.equal(5934);
    });

    it("Not defiend yet", () => {
        const input = [3, 4, 3, 1, 2];
        const res = stage(input, 256);
        expect(res).to.equal(26984457539);
    });
});
