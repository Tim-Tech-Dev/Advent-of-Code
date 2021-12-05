// day05:
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = parse(readFileSync(inputPath, "utf8"));
    console.log(
        `There are '${stage0(
            input,
        )}' points at which at least two lines of hydrothermal vents overlap and '${stage1(
            input,
        )}' with diagonals.`,
    );
}

type LineDefinition = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

export function stage0(lines: LineDefinition[]) {
    const points: [number, number][] = [];
    const counts: { [index: string]: number } = {};

    for (const c of lines) {
        const x = Math.min(c.x1, c.x2);
        const xm = Math.max(c.x1, c.x2);
        const y = Math.min(c.y1, c.y2);
        const ym = Math.max(c.y1, c.y2);

        // horizontal and vertical lines
        if (xm - x === 0 || ym - y === 0) {
            for (let i = x; i <= xm; i++) {
                for (let j = y; j <= ym; j++) {
                    points.push([i, j]);
                }
            }
        }
    }

    points
        .map((v) => v.toString())
        .forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });

    return Object.values(counts).filter((v) => v > 1).length;
}

export function stage1(lines: LineDefinition[]) {
    const points: [number, number][] = [];
    const counts: { [index: string]: number } = {};

    for (const c of lines) {
        const x = Math.min(c.x1, c.x2);
        const xm = Math.max(c.x1, c.x2);
        const y = Math.min(c.y1, c.y2);
        const ym = Math.max(c.y1, c.y2);

        // horizontal and vertical lines
        if (xm - x === 0 || ym - y === 0) {
            for (let i = x; i <= xm; i++) {
                for (let j = y; j <= ym; j++) {
                    points.push([i, j]);
                }
            }
        }

        // diagonal lines
        if (xm - x === ym - y) {
            if ((c.x1 < c.x2 && c.y1 < c.y2) || (c.x1 > c.x2 && c.y1 > c.y2)) {
                for (let i = 0; i <= xm - x; i++) {
                    points.push([x + i, y + i]);
                }
            } else {
                for (let i = 0; i <= xm - x; i++) {
                    points.push([xm - i, y + i]);
                }
            }
        }
    }

    points
        .map((v) => v.toString())
        .forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });

    return Object.values(counts).filter((v) => v > 1).length;
}

export function parse(str: string): LineDefinition[] {
    return str
        .split("\n")
        .map((v) =>
            v
                .replace(/ -> /gm, ",")
                .split(",")
                .map((v) => parseInt(v)),
        )
        .map((v) => {
            return {
                x1: v[0] ?? -1,
                y1: v[1] ?? -1,
                x2: v[2] ?? -1,
                y2: v[3] ?? -1,
            };
        });
}
