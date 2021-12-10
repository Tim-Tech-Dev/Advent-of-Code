import "mocha";
import { expect } from "chai";
import { stage0, stage1 } from "./index";

const input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`.split("\n");

describe("[2021-10]", () => {
    it("stage 0: The score of the corrupted lines should be 26397", () => {
        const res = stage0(input);
        expect(res).to.equal(26397);
    });

    it("stage 1: The total score of completion string should be 288957", () => {
        const res = stage1(input);
        expect(res).to.equal(288957);
    });
});
