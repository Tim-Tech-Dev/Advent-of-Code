// --- Day 15: Chiton ---
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = parse(readFileSync(inputPath, "utf8"));
    console.log(
        `The total risk level caused by the chitons is '${stage0(
            input.values,
            input.width,
        )}'. If the map is expanded rhe value increses to '${stage1(
            input.values,
            input.width,
        )}'.`,
    );
}

export function parse(str: string) {
    const width = Math.max(...str.split("\n").map((v) => v.length));
    const values = str
        .replace(/\n/gm, "")
        .split("")
        .map((v) => parseInt(v));
    return { values, width };
}

function connected<T, R>(
    array: T[],
    width: number,
    pos: number,
    callbackfn: (value: T, index: number, array: T[]) => R,
): R[] {
    const res: R[] = [];

    const locations = [pos - width, pos + 1, pos + width, pos - 1];

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

type Node = {
    gScore: number;
    fScore: number;
    edges: {
        key: string;
        weight: number;
    }[];
    cameFrom?: Node;
};

function A_star(
    nodes: Map<string, Node>,
    start: string,
    goal: string,
    h: (key: string, nodes: Map<string, Node>) => number,
) {
    const openSet: Map<string, Node> = new Map();

    const _start = nodes.get(start);
    if (!_start) {
        return "fail";
    }
    _start.gScore = 0;
    openSet.set(start, _start);

    while (openSet.size > 0) {
        const current = Array.from(openSet)
            .sort((a, b) => a[1].fScore - b[1].fScore)
            .pop();

        if (!current) {
            return "fail";
        }

        if (current[0] === goal) {
            return current;
        }

        openSet.delete(current[0]);

        for (const edge of current[1].edges) {
            const node = nodes.get(edge.key);
            const tentative_gScore = current[1].gScore + edge.weight;
            if (node && tentative_gScore < node.gScore) {
                node.cameFrom = current[1];
                node.gScore = tentative_gScore;
                node.fScore = h(edge.key, nodes);
                nodes.set(edge.key, node);

                if (!openSet.has(edge.key)) {
                    openSet.set(edge.key, node);
                }
            }
        }
    }

    return "end";
}

export function stage0(values: number[], width: number) {
    const nodes: Map<string, Node> = new Map(
        values.map((_v, i, arr) => [
            `${i % width},${Math.floor(i / width)}`,
            {
                gScore: Number.POSITIVE_INFINITY,
                fScore: Number.POSITIVE_INFINITY,
                edges: connected(arr, width, i, (v, i) => ({
                    key: `${i % width},${Math.floor(i / width)}`,
                    weight: v,
                })),
            },
        ]),
    );

    const res = A_star(nodes, "0,0", `${width - 1},${width - 1}`, (k) => {
        const res = k.split(",").map((v) => parseInt(v)) as [number, number];
        return Math.floor(values.length / width) - res[1] + (width - res[0]);
    });

    return typeof res !== "string" ? res[1].gScore : res;
}

export function stage1(values: number[], width: number) {
    const additives = [
        [0, 1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
        [4, 5, 6, 7, 8],
    ];

    const lines: number[][] = [];

    for (let i = 0; i < values.length; i += width) {
        lines.push(values.slice(i, i + width));
    }

    const newValues: number[] = [];

    for (const add of additives) {
        for (const line of lines) {
            for (const num of add) {
                newValues.push(
                    ...line.map((v) => (v + num > 9 ? v + num - 9 : v + num)),
                );
            }
        }
    }

    return stage0(newValues, width * 5);
}
