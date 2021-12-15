import "mocha";
import { expect } from "chai";
import { parse, stage0, stage1 } from "./index";

const string = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

const values = [
    1, 1, 6, 3, 7, 5, 1, 7, 4, 2, 1, 3, 8, 1, 3, 7, 3, 6, 7, 2, 2, 1, 3, 6, 5,
    1, 1, 3, 2, 8, 3, 6, 9, 4, 9, 3, 1, 5, 6, 9, 7, 4, 6, 3, 4, 1, 7, 1, 1, 1,
    1, 3, 1, 9, 1, 2, 8, 1, 3, 7, 1, 3, 5, 9, 9, 1, 2, 4, 2, 1, 3, 1, 2, 5, 4,
    2, 1, 6, 3, 9, 1, 2, 9, 3, 1, 3, 8, 5, 2, 1, 2, 3, 1, 1, 9, 4, 4, 5, 8, 1,
];

const input = parse(string);

describe("[2021-15]", () => {
    it("Test parsing function", () => {
        const res = parse(string);
        expect(res.width).to.equal(10);
        expect(res.values).to.deep.equal(values);
    });

    it("stage 0: The path with the lowest total risk should be 40 units long", () => {
        const res = stage0(input.values, input.width);
        expect(res).to.equal(40);
    });

    it("stage 1: In the expanded map, the path with the lowest total risk should be 315 units long", () => {
        const res = stage1(input.values, input.width);
        expect(res).to.equal(315);
    });
});
