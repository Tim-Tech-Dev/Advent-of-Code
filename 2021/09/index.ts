// --- Day 9: Smoke Basin ---
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

let WIDTH = 100;

export function main() {
    const input = readFileSync(inputPath, "utf8")
        .split("\n")
        .map((v) => v.split("").map((v) => parseInt(v)));
    console.log(
        `The sum of the risk levels on the height map is '${stage0(
            input,
        )}'. '${stage1(
            input,
        )}' is the multiple of sizes of the three largest basins.`,
    );
}

function connected<T, R>(
    array: T[],
    width: number,
    pos: number,
    callbackfn: (value: T, index: number, array: T[]) => R,
): R[] {
    const res: R[] = [];
    const left = array[pos - 1];
    if (Math.floor(pos / width) === Math.floor((pos - 1) / width) && left) {
        res.push(callbackfn(left, pos - 1, array));
    }
    const right = array[pos + 1];
    if (Math.floor(pos / width) === Math.floor((pos + 1) / width) && right) {
        res.push(callbackfn(right, pos - 1, array));
    }
    const up = array[pos - width];
    if (pos - width >= 0 && up) {
        res.push(callbackfn(up, pos - 1, array));
    }
    const down = array[pos + width];
    if (pos + width < array.length && down) {
        res.push(callbackfn(down, pos + width, array));
    }
    return res;
}

export function stage0(arg: number[][]) {
    const riskLevels = arg.map((v, i) =>
        v.map((k, j) => {
            const up = (arg[i + 1] ?? [])[j] ?? Number.POSITIVE_INFINITY;
            const down = (arg[i - 1] ?? [])[j] ?? Number.POSITIVE_INFINITY;
            const left = v[j - 1] ?? Number.POSITIVE_INFINITY;
            const right = v[j + 1] ?? Number.POSITIVE_INFINITY;
            return Math.min(up, down, left, right) > k ? k + 1 : 0;
        }),
    );

    return riskLevels
        .map((v) => v.reduce((a, b) => a + b))
        .reduce((a, b) => a + b);
}

function pos(x: number, y: number) {
    if (
        !Number.isInteger(x) ||
        !Number.isInteger(y) ||
        x < 0 ||
        y < 0 ||
        x >= WIDTH
    ) {
        console.log("err x:", x, " y:", y);

        return -1;
    }
    return y * WIDTH + x;
}

export function stage1(arg: number[][]) {
    WIDTH = (arg[0] ?? []).length;

    let board: number[] = arg
        .reduce((a, b) => a.concat(b))
        .map((v) => (v === 9 ? 0 : -1));

    const seeds = arg
        .flatMap((v, i) =>
            v.map((k, j) => {
                const up = (arg[i + 1] ?? [])[j] ?? Number.POSITIVE_INFINITY;
                const down = (arg[i - 1] ?? [])[j] ?? Number.POSITIVE_INFINITY;
                const left = v[j - 1] ?? Number.POSITIVE_INFINITY;
                const right = v[j + 1] ?? Number.POSITIVE_INFINITY;
                if (Math.min(up, down, left, right) > k) {
                    return [i, j];
                }
                return [];
            }),
        )
        .filter((v) => v.length !== 0) as [number, number][];

    seeds.forEach((v, i) => {
        if (board[pos(v[1], v[0])] === -1) {
            board[pos(v[1], v[0])] = i + 1;
        }
    });

    let bool = true;
    while (bool) {
        bool = false;
        board = board.map((v, i) => {
            if (v !== -1) {
                return v;
            }
            return (
                connected(board, WIDTH, i, (v) => {
                    if (v > 0) {
                        bool = true;
                        return v;
                    }
                    return -1;
                }).filter((v) => v > 0)[0] ?? -1
            );
        });
    }

    let counts: number[] = [];
    board.forEach((v) => {
        counts[v] = (counts[v] || 0) + 1;
    });
    counts = counts.slice(1).sort((a, b) => b - a);

    return (counts[0] ?? 0) * (counts[1] ?? 0) * (counts[2] ?? 0);
}
