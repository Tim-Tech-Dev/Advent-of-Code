import "mocha";
import { expect } from "chai";
import { stage0, stage1 } from "./index";

describe("[2021-01]", () => {
    it("stage 0: The amount of larger measurement should be 7", () => {
        const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
        const res = stage0(input);
        expect(res).to.equal(7);
    });
    it("stage 1: The amount of larger three-measurement sums should be 5", () => {
        const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
        const res = stage1(input);
        expect(res).to.equal(5);
    });
});
