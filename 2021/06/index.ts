// --- Day 6: Lanternfish ---
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = readFileSync(inputPath, "utf8")
        .split(",")
        .map((v) => parseInt(v));
    console.log(
        `There will be '${stage(
            input,
            80,
        )}' glowing lanternfish after 80 days and '${stage(
            input,
            256,
        )}' after 256 days, if our models are correct.`,
    );
}

export function stage(arg: number[], days: number) {
    let fish: number[] = Array<number>(8).fill(0);
    arg.map((v) => fish[v]++);

    for (let i = 0; i < days; i++) {
        fish = day(fish);
    }
    return fish.reduce((a, b) => a + b);
}

function day(fish: number[]) {
    const newFish: number[] = Array<number>(9).fill(0);
    for (let i = 0; i < fish.length; i++) {
        const val = fish[i] ?? 0;
        if (i === 0) {
            newFish[6] += val;
            newFish[8] += val;
        } else {
            newFish[i - 1] += val;
        }
    }
    return newFish;
}
