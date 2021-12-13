// --- Day 13: Transparent Origami ---
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = parse(readFileSync(inputPath, "utf8"));
    console.log(
        `After the first fold ther are '${stage0({
            points: input.points,
            foldingInstructions: [input.foldingInstructions[0] ?? ["", 0]],
        })}' points visible. The activation code for our infrared thermal imaging camera is:\n'${stage1(
            {
                points: input.points,
                foldingInstructions: input.foldingInstructions,
            },
        )}'`,
    );
}

export function parse(str: string) {
    const parts = str.split("\n\n");
    const points = parts[0]
        ?.split("\n")
        .map((v) => v.split(",").map((v) => parseInt(v))) as [number, number][];
    const foldingInstructions =
        parts[1]
            ?.split("\n")
            .map(
                (v) =>
                    [v.slice(11, 12), parseInt(v.slice(13))] as [
                        string,
                        number,
                    ],
            ) ?? [];
    return {
        points,
        foldingInstructions,
    };
}

export function fold(
    points: [number, number][],
    instruction: [string, number],
) {
    const array: [number, number][] = [];
    points.forEach((point) => {
        if (point[0] > instruction[1] && instruction[0] === "x") {
            array.push([2 * instruction[1] - point[0], point[1]]);
        } else if (point[1] > instruction[1] && instruction[0] === "y") {
            array.push([point[0], 2 * instruction[1] - point[1]]);
        } else {
            array.push(point);
        }
    });
    return array;
}

export function stage0(arg: {
    points: [number, number][];
    foldingInstructions: [string, number][];
}) {
    let points = arg.points;
    const counts: { [index: string]: number } = {};

    for (const instruction of arg.foldingInstructions) {
        points = fold(points, instruction);
    }

    points.forEach(
        (v) => (counts[v.join(",")] = (counts[v.join(",")] || 0) + 1),
    );

    return Object.keys(counts).length;
}

export function stage1(arg: {
    points: [number, number][];
    foldingInstructions: [string, number][];
}) {
    let points = arg.points;

    for (const instruction of arg.foldingInstructions) {
        points = fold(points, instruction);
    }

    const max = points.reduce((a, b) => [
        Math.max(a[0], b[0] + 1),
        Math.max(a[1], b[1] + 1),
    ]);
    let str = "";
    for (let y = 0; y < max[1]; y++) {
        for (let x = 0; x < max[0]; x++) {
            if (points.map((v) => v.join()).includes(`${x},${y}`)) {
                str += "#";
            } else {
                str += ".";
            }
        }
        str += "\n";
    }
    return str;
}
