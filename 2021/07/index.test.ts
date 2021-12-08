import "mocha";
import { expect } from "chai";
import { stage0, stage1 } from "./index";

describe("[2021-07]", () => {
    const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
    it("stage 0: Horizontally align those crab subs should take them 37 fuel", () => {
        const res = stage0(input);
        expect(res?.pos).to.equal(2);
        expect(res?.fuelcost).to.equal(37);
    });

    it("stage 1: If the crabs do not burn fuel at a constant rate, they align with 168", () => {
        const res = stage1(input);
        expect(res?.pos).to.equal(5);
        expect(res?.fuelcost).to.equal(168);
    });
});
