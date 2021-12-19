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

    // find the leftmost [number,number] of depth 4 or more
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

    // if we fond one explode it
    if (index > 0) {
        // add the left value to the next number to the left
        for (let i = index - 2; i >= 0; i--) {
            if (typeof tokens[i] === "number") {
                newtokens[i] =
                    ((tokens[i] as number | undefined) ?? 0) +
                    ((tokens[index - 1] as number | undefined) ?? 0);
                break;
            }
        }
        // add the right value to the next number to the right
        for (let i = index + 2; i < tokens.length; i++) {
            if (typeof tokens[i] === "number") {
                newtokens[i] =
                    ((tokens[i] as number | undefined) ?? 0) +
                    ((tokens[index + 1] as number | undefined) ?? 0);
                break;
            }
        }
        // newtokens.splice(index - 2, 5, 0);
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

    // find the leftmost number grater than 9
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (typeof token === "number" && token > 9) {
            // replace it with a pair
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
    // try to explode the number before splitting it
    const res1 = explode(tokens);
    if (tokens.join("") !== res1.join("")) {
        return reduce(res1);
    }

    const res2 = split(tokens.map((v) => v));
    if (tokens.join("") !== res2.join("")) {
        return reduce(res2);
    }

    // because this function is recursive this will only called in the last call after all reduction steps happend
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
    // adding is simple because we only have to add some tokens
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

type SnailfishNumber = [SnailfishNumber | number, SnailfishNumber | number];

export function magnitude(tokens: Token[]): number {
    const json = JSON.parse(tokens.join("")) as SnailfishNumber;

    const recurse = (v: SnailfishNumber) => {
        let res = 0;
        if (typeof v[0] === "number") {
            res += v[0] * 3;
        } else {
            res += recurse(v[0]) * 3;
        }
        if (typeof v[1] === "number") {
            res += v[1] * 2;
        } else {
            res += recurse(v[1]) * 2;
        }
        return res;
    };
    return recurse(json);
}

export function stage0(arg: string[]) {
    const list = arg.map((v) => parse(v.trim()));
    const res = sum(list);
    const mag = magnitude(res);
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
