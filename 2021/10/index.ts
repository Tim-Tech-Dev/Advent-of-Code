// --- Day 10: Syntax Scoring ---
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = readFileSync(inputPath, "utf8").split("\n");
    console.log(
        `The sum of the scores of the first illegal character in each corrupted line is '${stage0(
            input,
        )}'. The middle completion score is '${stage1(input)}'`,
    );
}

export function stage0(lines: string[]) {
    const res = lines.map((v) => {
        const line = v.split("");
        const stack = [];
        for (const char of line) {
            switch (char) {
                case "(":
                    stack.push("(");
                    break;
                case ")":
                    if (stack[stack.length - 1] === "(") {
                        stack.pop();
                    } else {
                        return ")";
                    }
                    break;
                case "[":
                    stack.push("[");
                    break;
                case "]":
                    if (stack[stack.length - 1] === "[") {
                        stack.pop();
                    } else {
                        return "]";
                    }
                    break;
                case "{":
                    stack.push("{");
                    break;
                case "}":
                    if (stack[stack.length - 1] === "{") {
                        stack.pop();
                    } else {
                        return "}";
                    }
                    break;
                case "<":
                    stack.push("<");
                    break;
                case ">":
                    if (stack[stack.length - 1] === "<") {
                        stack.pop();
                    } else {
                        return ">";
                    }
                    break;
                default:
                    break;
            }
        }
        return;
    });

    const counts: { [index: string]: number } = {};

    res.forEach(function (x) {
        if (x) {
            counts[x] = (counts[x] || 0) + 1;
        }
    });

    return (
        (counts[")"] ?? -1) * 3 +
        (counts["]"] ?? -1) * 57 +
        (counts["}"] ?? -1) * 1197 +
        (counts[">"] ?? -1) * 25137
    );
}

export function stage1(lines: string[]) {
    const res = lines.map((v) => {
        const line = v.split("");
        const stack = [];
        for (const char of line) {
            switch (char) {
                case "(":
                    stack.push("(");
                    break;
                case ")":
                    if (stack[stack.length - 1] === "(") {
                        stack.pop();
                    } else {
                        return undefined;
                    }
                    break;
                case "[":
                    stack.push("[");
                    break;
                case "]":
                    if (stack[stack.length - 1] === "[") {
                        stack.pop();
                    } else {
                        return undefined;
                    }
                    break;
                case "{":
                    stack.push("{");
                    break;
                case "}":
                    if (stack[stack.length - 1] === "{") {
                        stack.pop();
                    } else {
                        return undefined;
                    }
                    break;
                case "<":
                    stack.push("<");
                    break;
                case ">":
                    if (stack[stack.length - 1] === "<") {
                        stack.pop();
                    } else {
                        return undefined;
                    }
                    break;
                default:
                    break;
            }
        }
        return stack
            .reverse()
            .map((v) =>
                v === "("
                    ? ")"
                    : v === "["
                    ? "]"
                    : v === "{"
                    ? "}"
                    : v === "<"
                    ? ">"
                    : "Error",
            );
    });

    const scores = res
        .map((v) => {
            if (!v) {
                return undefined;
            }

            let totalScore = 0;

            v.forEach((x) => {
                if (x !== "Error") {
                    totalScore = totalScore * 5;
                    if (x === ")") {
                        totalScore += 1;
                    }
                    if (x === "]") {
                        totalScore += 2;
                    }
                    if (x === "}") {
                        totalScore += 3;
                    }
                    if (x === ">") {
                        totalScore += 4;
                    }
                }
            });
            return totalScore;
        })
        .filter((v) => v !== undefined) as number[];

    return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
}
