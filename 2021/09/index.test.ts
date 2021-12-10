import "mocha";
import { expect } from "chai";
import { stage0, stage1 } from "./index";

describe("[2021-09]", () => {
    const input = [
        [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
        [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
        [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
        [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
        [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
    ];
    it("stage 0: The sum of the risk levels of all low points on the heightmap should be 15", () => {
        const res = stage0(input);
        expect(res).to.equal(15);
    });

    it("stage 1: sizes of the three largest basins multiplied together should be 1134", () => {
        const res = stage1(input);
        expect(res).to.equal(1134);
    });
});
