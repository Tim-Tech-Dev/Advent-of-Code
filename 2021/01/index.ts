// day01:
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");
const outputPath = resolve(__dirname, "./output.txt");

const input = readFileSync(inputPath, "utf8");

writeFileSync(outputPath, JSON.stringify(main(input)), "utf8");

export function main(input: string) {
    const nums = input.split("\n").map((i) => parseInt(i, 10));
    const res1 = nums.filter((v, i, arr) => (arr[i - 1] ?? 999999999) < v);

    const res2 = nums
        .map(
            (v, i, arr) =>
                (arr[i - 1] ?? -999999999) + v + (arr[i + 1] ?? -999999999),
        )
        .map((v) => (isNaN(v) ? 0 : v === Math.abs(v) ? v : 0))
        .splice(1)
        .filter((v, i, arr) => (arr[i - 1] ?? 999999999) < v);

    return [res1.length, res2.length];
}
