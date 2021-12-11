import "mocha";
import { expect } from "chai";
import { stage0, stage1, step } from "./index";

const input = [
    5, 4, 8, 3, 1, 4, 3, 2, 2, 3, 2, 7, 4, 5, 8, 5, 4, 7, 1, 1, 5, 2, 6, 4, 5,
    5, 6, 1, 7, 3, 6, 1, 4, 1, 3, 3, 6, 1, 4, 6, 6, 3, 5, 7, 3, 8, 5, 4, 7, 8,
    4, 1, 6, 7, 5, 2, 4, 6, 4, 5, 2, 1, 7, 6, 8, 4, 1, 7, 2, 1, 6, 8, 8, 2, 8,
    8, 1, 1, 3, 4, 4, 8, 4, 6, 8, 4, 8, 5, 5, 4, 5, 2, 8, 3, 7, 5, 1, 5, 2, 6,
];

describe("[2021-11]", () => {
    it("Testing the stepping function", () => {
        // one flash
        const res1 = step([0, 0, 0, 0, 9, 0, 0, 0, 0], 3);
        expect(res1.octopuses).to.eql([2, 2, 2, 2, 0, 2, 2, 2, 2]);
        expect(res1.flashes).to.equal(1);

        // multiple flashes
        const input = [
            8, 8, 0, 7, 4, 7, 6, 5, 5, 5, 5, 0, 8, 9, 0, 8, 7, 0, 5, 4, 8, 5, 9,
            7, 8, 8, 9, 6, 0, 8, 8, 4, 8, 5, 7, 6, 9, 6, 0, 0, 8, 7, 0, 0, 9, 0,
            8, 8, 0, 0, 6, 6, 0, 0, 0, 8, 8, 9, 8, 9, 6, 8, 0, 0, 0, 0, 5, 9, 4,
            3, 0, 0, 0, 0, 0, 0, 7, 4, 5, 6, 9, 0, 0, 0, 0, 0, 0, 8, 7, 6, 8, 7,
            0, 0, 0, 0, 6, 8, 4, 8,
        ];
        const output = [
            0, 0, 5, 0, 9, 0, 0, 8, 6, 6, 8, 5, 0, 0, 8, 0, 0, 5, 7, 5, 9, 9, 0,
            0, 0, 0, 0, 0, 3, 9, 9, 7, 0, 0, 0, 0, 0, 0, 4, 1, 9, 9, 3, 5, 0, 8,
            0, 0, 6, 3, 7, 7, 1, 2, 3, 0, 0, 0, 0, 0, 7, 9, 1, 1, 2, 5, 0, 0, 0,
            9, 2, 2, 1, 1, 1, 3, 0, 0, 0, 0, 0, 4, 2, 1, 1, 2, 5, 0, 0, 0, 0, 0,
            2, 1, 1, 1, 9, 0, 0, 0,
        ];
        const res2 = step(input, 10);
        expect(res2.octopuses).to.eql(output);
        expect(res2.flashes).to.equal(45);
    });

    it("stage 0: The number of flashes should be 204 after 10 and 1656 after 100 iterations", () => {
        const res1 = stage0(input, 10, 10);
        expect(res1).to.equal(204);

        const res2 = stage0(input, 10, 100);
        expect(res2).to.equal(1656);
    });

    it("stage 1: The synchronizing should happen at step 195", () => {
        const res = stage1(input, 10);
        expect(res).to.equal(195);
    });
});
