// --- Day 7: The Treachery of Whales ---
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = readFileSync(inputPath, "utf8")
        .split(",")
        .map((v) => parseInt(v));
    const res0 = stage0(input);
    const res1 = stage1(input);
    console.log(
        `We have to move the crab submarines to ${res0?.pos} to achieve the lowest fuel cost of '${res0?.fuelcost}' and '${res1?.fuelcost}' if the crabs do not burn fuel at a constant rate.`,
    );
}

export function stage0(arg: number[]) {
    const arrays: number[][] = Array<number[]>(Math.max(...arg)).fill(arg);

    const costs = arrays
        .map((v, i) => ({
            pos: i,
            fuelcost: v
                .map((v) => Math.abs(v - i))
                .reduce((prev, curr) => prev + curr),
        }))
        .sort((a, b) => a.fuelcost - b.fuelcost);
    return costs[0];
}

export function stage1(arg: number[]) {
    const arrays: number[][] = Array<number[]>(Math.max(...arg)).fill(arg);

    const costs = arrays
        .map((v, i) => ({
            pos: i,
            fuelcost: v
                .map((v) => triangular(Math.abs(v - i)))
                .reduce((prev, curr) => prev + curr),
        }))
        .sort((a, b) => a.fuelcost - b.fuelcost);
    return costs[0];
}

/**
 * calculate triangular numbers
 * (https://en.wikipedia.org/wiki/Triangular_number)
 *
 *
 * Source: https://gist.github.com/ryansmith94/4953830
 * @param value
 * @returns
 */
function triangular(value: number) {
    const abs = Math.abs(value);
    return (abs / 2) * (abs + 1) * (abs / value) || 0;
}
