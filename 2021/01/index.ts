// day01:
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = readFileSync(inputPath, "utf8")
        .split("\n")
        .map((v) => parseInt(v, 10));
    console.log(
        `There are '${stage0(input)}' measurements and '${stage1(
            input,
        )}' sums which are larger than the previous.`,
    );
}
export function stage0(arg: number[]) {
    return arg.filter((v, i) => {
        const prev = arg[i - 1];
        return prev ? prev < v : false;
    }).length;
}

export function stage1(arg: number[]) {
    return stage0(
        arg.map((v, i) => {
            const prev = arg[i - 1];
            const next = arg[i + 1];
            return prev ? (next ? prev + v + next : 0) : 0;
        }),
    );
}
