import "mocha";
import { expect } from "chai";
import { fold, parse, stage0, stage1 } from "./index";

const points: [number, number][] = [
    [6, 10],
    [0, 14],
    [9, 10],
    [0, 3],
    [10, 4],
    [4, 11],
    [6, 0],
    [6, 12],
    [4, 1],
    [0, 13],
    [10, 12],
    [3, 4],
    [3, 0],
    [8, 4],
    [1, 10],
    [2, 14],
    [8, 10],
    [9, 0],
];

const input = parse(`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`);

describe("[2021-13]", () => {
    it("test fold function x", () => {
        const res = fold(
            [
                [9, 0],
                [6, 6],
            ],
            ["x", 5],
        );
        expect(res).to.deep.equal([
            [1, 0],
            [4, 6],
        ]);
    });

    it("test fold function y", () => {
        const res = fold(
            [
                [0, 9],
                [6, 6],
            ],
            ["y", 5],
        );
        expect(res).to.deep.equal([
            [0, 1],
            [6, 4],
        ]);
    });

    it("test first fold of stage 1 test", () => {
        const res = fold(points, ["y", 7]);
        expect(res).to.deep.equal([
            [6, 4],
            [0, 0],
            [9, 4],
            [0, 3],
            [10, 4],
            [4, 3],
            [6, 0],
            [6, 2],
            [4, 1],
            [0, 1],
            [10, 2],
            [3, 4],
            [3, 0],
            [8, 4],
            [1, 4],
            [2, 0],
            [8, 4],
            [9, 0],
        ]);
    });

    it("stage 0: The resulting paper should have 16 points", () => {
        const res = stage0(input);
        expect(res).to.equal(16);
    });

    it("stage 1: The instructions should make a square", () => {
        const res = stage1(input);
        expect(res).to.equal(`#####
#...#
#...#
#...#
#####
`);
    });
});
