import "mocha";
import { expect } from "chai";
import { stage0, stage1 } from "./index";

describe("day03", () => {
    const input = [
        "00100",
        "11110",
        "10110",
        "10111",
        "10101",
        "01111",
        "00111",
        "11100",
        "10000",
        "11001",
        "00010",
        "01010",
    ].map((v) => v.split(""));
    console.log(input);
    it("Not defiend yet", () => {
        const res = stage0(input);
        expect(res).to.equal(198);
    });

    it("Not defiend yet", () => {
        const res = stage1(input);
        expect(res).to.equal(230);
    });
});
