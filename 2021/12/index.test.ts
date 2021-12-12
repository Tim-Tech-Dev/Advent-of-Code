import "mocha";
import { expect } from "chai";
import { stage0, stage1 } from "./index";

const input = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`.split("\n");

describe("[2021-12]", () => {
    it("stage 0: There should be 226 possible paths", () => {
        const res = stage0(input);
        expect(res).to.equal(226);
    });

    it("stage 1: If we travel to one small cave twice, there should be 3509 possible paths", () => {
        const res = stage1(input);
        expect(res).to.equal(3509);
    });
});
