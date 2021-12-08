// --- Day 8: Seven Segment Search ---
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = parse(readFileSync(inputPath, "utf8"));
    console.log(
        `Unique digits 1, 4, 7, or 8 appear '${stage0(
            input,
        )}' times. The sum of all output values is '${stage1(input)}'.`,
    );
}

export function parse(str: string) {
    return str
        .split("\n")
        .filter((v) => v !== "")
        .map((v) =>
            v.split(" | ").map((v) => v.split(" ").map((v) => v.split(""))),
        ) as [string[][], string[][]][];
}

export function stage0(arg: [string[][], string[][]][]) {
    let count = 0;
    for (const line of arg) {
        line[1].forEach((v) => {
            if (
                v.length === 2 ||
                v.length === 3 ||
                v.length === 4 ||
                v.length === 7
            ) {
                count++;
            }
        });
    }

    return count;
}

export function stage1(arg: [string[][], string[][]][]) {
    let sum = 0;
    for (const line of arg) {
        // Because we know that there will be one of each number we can extact most of the mapping from the counts
        //
        //  8888
        // 6    8
        // 6    8
        //  7777
        // 4    9
        // 4    9
        //  7777
        const counts: { [index: string]: number } = {};
        line[0].forEach((v) =>
            v.forEach((x) => {
                counts[x] = (counts[x] || 0) + 1;
            }),
        );

        const mapping = {
            a: findInObject(counts, 8),
            b: findInObject(counts, 6),
            c: findInObject(counts, 8),
            d: findInObject(counts, 7),
            e: findInObject(counts, 4),
            f: findInObject(counts, 9),
            g: findInObject(counts, 7),
        };

        for (const digit of line[0]) {
            switch (digit.length) {
                case 2: // digit 1
                    mapping.a = mapping.a.filter((v) => !digit.includes(v));
                    mapping.c = mapping.c.filter((v) => digit.includes(v));
                    break;
                case 4: // digit 4
                    mapping.d = mapping.d.filter((v) => digit.includes(v));
                    mapping.g = mapping.g.filter((v) => !digit.includes(v));
                    break;
            }
        }

        const map = {
            a: mapping.a[0] ?? "",
            b: mapping.b[0] ?? "",
            c: mapping.c[0] ?? "",
            d: mapping.d[0] ?? "",
            e: mapping.e[0] ?? "",
            f: mapping.f[0] ?? "",
            g: mapping.g[0] ?? "",
        };

        // Parse the numbers after the |
        let str = "";
        for (const digit of line[1]) {
            str += getDigit(digit, map);
        }
        sum += parseInt(str);
    }
    return sum;
}

function findInObject<T>(obj: { [index: string]: T }, value: T) {
    return Object.entries(obj)
        .filter((v) => v[1] === value)
        .map((v) => v[0]);
}

function getDigit(
    digit: string[],
    mapping: {
        a: string;
        b: string;
        c: string;
        d: string;
        e: string;
        f: string;
        g: string;
    },
) {
    switch (digit.length) {
        case 2:
            return "1";
        case 3:
            return "7";
        case 4:
            return "4";
        case 7:
            return "8";
        case 6:
            if (digit.includes(mapping.c) && digit.includes(mapping.e)) {
                return "0";
            } else if (digit.includes(mapping.c)) {
                return "9";
            } else {
                return "6";
            }
        case 5:
            if (digit.includes(mapping.e)) {
                return "2";
            } else if (digit.includes(mapping.c)) {
                return "3";
            } else {
                return "5";
            }
    }
    return;
}
