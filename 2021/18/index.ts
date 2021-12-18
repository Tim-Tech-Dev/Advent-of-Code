// --- Day 18: Snailfish ---
import { readFileSync } from "fs";
import { resolve } from "path";

// eslint-disable-next-line prefer-const
let DEBUG = 3;

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = readFileSync(inputPath, "utf8").split("\n");
    console.log(
        `The the magnitude of the final sum is '${stage0(
            input,
        )}'. The largest magnitude of any sum of two different snailfish numbers is '${
            stage1(input)?.mag
        }'.`,
    );
}

type Token = number | "[" | "]" | ",";

export function parse(str: string): Token[] {
    const tokens: Token[] = [];
    let num = "";
    for (const char of str) {
        if (char === "[" || char === "," || char === "]") {
            if (num.length > 0) {
                tokens.push(parseInt(num));
                num = "";
            }
            tokens.push(char);
        } else {
            num += char;
        }
    }
    return tokens;
}

export function explode(tokens: Token[]) {
    if (DEBUG < 1) {
        console.log("explode(): ", tokens.join(""));
    }
    let newtokens = tokens;
    let depth = 0;

    let index = -1;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token === "[") depth++;
        if (token === "]") depth--;
        if (token === "," && depth > 4) {
            if (
                typeof tokens[i - 1] === "number" &&
                typeof tokens[i + 1] === "number"
            ) {
                index = i;
                break;
            }
        }
    }

    if (index > 0) {
        for (let i = index - 2; i >= 0; i--) {
            if (typeof tokens[i] === "number") {
                newtokens[i] =
                    ((tokens[i] as number | undefined) ?? 0) +
                    ((tokens[index - 1] as number | undefined) ?? 0);
                break;
            }
        }
        for (let i = index + 2; i < tokens.length; i++) {
            if (typeof tokens[i] === "number") {
                newtokens[i] =
                    ((tokens[i] as number | undefined) ?? 0) +
                    ((tokens[index + 1] as number | undefined) ?? 0);
                break;
            }
        }
        newtokens[index] = 0;
        newtokens = tokens.filter(
            (_v, i) =>
                ![index - 2, index - 1, index + 1, index + 2].includes(i),
        );
    }
    if (DEBUG < 1) {
        console.log("explode->: ", newtokens.join(""));
    }
    return newtokens;
}

export function split(tokens: Token[]) {
    if (DEBUG < 1) {
        console.log("split(): ", tokens.join(""));
    }
    const newtokens = tokens;
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (typeof token === "number" && token > 9) {
            newtokens.splice(
                i,
                1,
                "[",
                Math.floor(token / 2),
                ",",
                Math.ceil(token / 2),
                "]",
            );
            break;
        }
    }
    if (DEBUG < 1) {
        console.log("split->: ", newtokens.join(""));
    }
    return newtokens;
}

export function reduce(tokens: Token[]): Token[] {
    if (DEBUG < 2) {
        console.log("reduce(): ", tokens.join(""));
    }

    const res1 = explode(tokens);
    if (tokens.join("") !== res1.join("")) {
        return reduce(res1);
    }

    const res2 = split(tokens.map((v) => v));
    if (tokens.join("") !== res2.join("")) {
        return reduce(res2);
    }

    if (DEBUG < 2) {
        console.log("reduce->: ", tokens.join(""));
    }
    return tokens;
}

export function add(a: Token[], b: Token[]) {
    if (DEBUG < 3) {
        console.log("add(a): ", a.join(""));
        console.log("add(b): ", b.join(""));
    }

    const res = reduce(["[", ...a, ",", ...b, "]"]);
    if (DEBUG < 3) {
        console.log("add->: ", res.join(""), "\n");
        JSON.parse(res.join(""));
    }
    return res;
}

export function sum(a: Token[][]) {
    return a.reduce((c, d) => add(c, d));
}

export function magnitude(tokens: Token[]): Token[] | number {
    const newtokens = tokens.map((v) => v);
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token === ",") {
            if (
                typeof tokens[i - 1] === "number" &&
                typeof tokens[i + 1] === "number"
            ) {
                newtokens.splice(
                    i - 2,
                    5,
                    ((tokens[i - 1] as number | undefined) ?? 0) * 3 +
                        ((tokens[i + 1] as number | undefined) ?? 0) * 2,
                );
                break;
            }
        }
    }

    if (newtokens.join("") === tokens.join("")) {
        const res = newtokens[0];
        if (typeof res === "number") {
            return res;
        } else {
            return newtokens;
        }
    } else {
        return magnitude(newtokens);
    }
}

export function stage0(arg: string[]) {
    const list = arg.map((v) => parse(v.trim()));
    const res = sum(list);
    let mag: Token[] | number | Error = magnitude(res);
    mag = typeof mag === "number" ? mag : new Error(mag.toString());
    return mag;
}

export function stage1(arg: string[]) {
    const list = arg.map((v) => parse(v.trim()));
    const temp = list
        .flatMap((i) =>
            list.map((j) =>
                i !== j
                    ? { first: i, second: j, res: add(i, j), mag: -1 }
                    : undefined,
            ),
        )
        .filter((v) => v !== undefined) as {
        first: Token[];
        second: Token[];
        res: Token[];
        mag: number;
    }[];

    const array = temp
        .map((v) => ({
            first: v.first,
            second: v.second,
            res: v.res,
            mag: magnitude(v.res) as number,
        }))
        .sort((a, b) => b.mag - a.mag);

    return array.shift();
}
