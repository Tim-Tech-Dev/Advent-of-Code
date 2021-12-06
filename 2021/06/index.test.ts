import "mocha";
import { expect } from "chai";
import { stage } from "./index";

describe("[2021-06]", () => {
    it("stage 0: We expect 18 lanternfish after 26 and 5934 after 80 days", () => {
        const input = [3, 4, 3, 1, 2];
        expect(stage(input, 18)).to.equal(26);
        expect(stage(input, 80)).to.equal(5934);
    });

    it("stage 1: We expect 26984457539 lanternfish after 256 days", () => {
        const input = [3, 4, 3, 1, 2];
        const res = stage(input, 256);
        expect(res).to.equal(26984457539);
    });
});
