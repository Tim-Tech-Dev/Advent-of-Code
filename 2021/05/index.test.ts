import "mocha";
import { expect } from "chai";
import { parse, stage0, stage1 } from "./index";

describe("day05", () => {
    const input = parse(`0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`);
    it("stage0: There should be 5 overlapping hydrothermal vents", () => {
        const res = stage0(input);
        expect(res).to.equal(5);
    });

    it("stage0: There should be 12 overlapping hydrothermal vents because of diagonals", () => {
        const res = stage1(input);
        expect(res).to.equal(12);
    });
});
