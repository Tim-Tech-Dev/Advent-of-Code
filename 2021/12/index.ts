// --- Day 12: Passage Pathing ---
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = readFileSync(inputPath, "utf8").split("\n");
    console.log(
        ` There are '${stage0(
            input,
        )}' possible paths. If we travel to one small cave twice, there are '${stage1(
            input,
        )}' possible paths.`,
    );
}

function recursion(
    nodes: {
        [index: string]: string[];
    },
    trace: string[],
    curr: string,
    ignoreOnce?: string,
): string[][] | undefined {
    if (curr === "end") {
        return [trace.concat(curr)];
    }

    if (
        curr === ignoreOnce &&
        trace.indexOf(curr) === trace.lastIndexOf(curr)
    ) {
        return nodes[curr]
            ?.map((str) => recursion(nodes, [...trace, curr], str, ignoreOnce))
            .reduce((prev, next) => (prev ?? []).concat(next ?? []));
    }

    if (curr.toLowerCase() === curr && trace.includes(curr)) {
        return undefined;
    }

    return nodes[curr]
        ?.map((str) => recursion(nodes, [...trace, curr], str, ignoreOnce))
        .reduce((prev, next) => (prev ?? []).concat(next ?? []));
}

export function stage0(arg: string[]) {
    const nodes: { [index: string]: string[] } = {};
    const edges = arg.map((v) => v.split("-"));

    for (const edge of edges) {
        const a = edge[0];
        const b = edge[1];
        if (a && b) {
            nodes[a] = (nodes[a] || []).concat(b);
            nodes[b] = (nodes[b] || []).concat(a);
        }
    }

    const res = recursion(nodes, [], "start");

    return res?.length;
}

export function stage1(arg: string[]) {
    const nodes: { [index: string]: string[] } = {};
    const counts: { [index: string]: number } = {};
    const edges = arg.map((v) => v.split("-"));
    let paths: string[][] = [];

    for (const edge of edges) {
        const a = edge[0];
        const b = edge[1];
        if (a && b) {
            nodes[a] = (nodes[a] || []).concat(b);
            nodes[b] = (nodes[b] || []).concat(a);
        }
    }

    const smallCaves = Object.keys(nodes).filter(
        (v) => v.toLowerCase() === v && v !== "start" && v !== "end",
    );

    for (const smallCave of smallCaves) {
        paths = paths.concat(recursion(nodes, [], "start", smallCave) ?? []);
    }

    const strings = paths.map((v) => v.join("-"));

    strings.forEach((v) => (counts[v] = (counts[v] || 0) + 1));

    return Object.keys(counts).length;
}
