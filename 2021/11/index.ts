// --- Day 11: Dumbo Octopus ---
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = readFileSync(inputPath, "utf8")
        .split("")
        .filter((v) => v !== "\n")
        .map((v) => parseInt(v));
    console.log(
        `The octopuses flash '${stage0(
            input,
            10,
            100,
        )}' times in total after 100 steps. They will synchronize in step '${stage1(
            input,
            10,
        )}'.`,
    );
}

function adjacent<T, R>(
    array: T[],
    width: number,
    pos: number,
    callbackfn: (value: T, index: number, array: T[]) => R,
): R[] {
    const res: R[] = [];

    const locations = [
        pos - width,
        pos - width + 1,
        pos + 1,
        pos + width + 1,
        pos + width,
        pos + width - 1,
        pos - 1,
        pos - width - 1,
    ];

    locations.forEach((v) => {
        const item = array[v];
        if (item && v >= 0 && v < array.length) {
            if (v - pos > 1) {
                if (Math.floor(pos / width) + 1 === Math.floor(v / width)) {
                    res.push(callbackfn(item, v, array));
                }
            } else if (v - pos < -1) {
                if (Math.floor(pos / width) - 1 === Math.floor(v / width)) {
                    res.push(callbackfn(item, v, array));
                }
            } else {
                if (Math.floor(pos / width) === Math.floor(v / width)) {
                    res.push(callbackfn(item, v, array));
                }
            }
        }
    });

    return res;
}

export function step(
    octopuses: number[],
    width: number,
): { octopuses: number[]; flashes: number } {
    // step A
    octopuses = octopuses.map((octopus) => octopus + 1);

    // step B
    let flashes = -1;
    let newflashes = 0;
    while (flashes !== newflashes) {
        flashes = newflashes;
        octopuses.forEach((octopus, i) => {
            if (octopus > 9) {
                newflashes++;
                adjacent(octopuses, width, i, (_v, i, arr) => arr[i]++);
                octopuses[i] = Number.NEGATIVE_INFINITY;
            }
        });
    }

    // step C
    octopuses = octopuses.map((octopus) => (octopus < 0 ? 0 : octopus));

    return { octopuses, flashes };
}

export function stage0(octopuses: number[], width: number, iterations: number) {
    let flashes = 0;

    for (let i = 0; i < iterations; i++) {
        const res = step(octopuses, width);
        octopuses = res.octopuses;
        flashes += res.flashes;
    }

    return flashes;
}

export function stage1(octopuses: number[], width: number) {
    let steps = 0;

    let flashes = 0;

    while (flashes !== 100) {
        const res = step(octopuses, width);
        octopuses = res.octopuses;
        flashes = res.flashes;
        steps++;
    }

    return steps;
}
