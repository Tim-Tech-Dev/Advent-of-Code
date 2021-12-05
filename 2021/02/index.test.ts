import "mocha";
import { expect } from "chai";
import { stage0, stage1 } from "./index";

describe("day02", () => {
    it("stage 0: This sequence of commands should dive the submarine to 150 m", () => {
        const input = [
            "forward 5",
            "down 5",
            "forward 8",
            "up 3",
            "down 8",
            "forward 2",
        ];
        const res = stage0(input);
        expect(res).to.equal(150);
    });

    it("stage 1: If the sub uses aim, this sequence of should dive the submarine to 900 m", () => {
        const input = [
            "forward 5",
            "down 5",
            "forward 8",
            "up 3",
            "down 8",
            "forward 2",
        ];
        const res = stage1(input);
        expect(res).to.equal(900);
    });
});
