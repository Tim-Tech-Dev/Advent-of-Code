// --- Day 2: Dive! ---
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = readFileSync(inputPath, "utf8").split("\n");
    console.log(
        `The multiple of the final horizontal position by the final depth is '${stage0(
            input,
        )} m' and '${stage1(input)} m' if the submarine uses aim.`,
    );
}
export function stage0(arg: string[]) {
    let horizontal = 0;
    let depth = 0;
    for (const cmd of arg.map((v) => v.split(" "))) {
        switch (cmd[0]) {
            case "forward":
                horizontal += parseInt(cmd[1] ?? "");
                break;
            case "up":
                depth -= parseInt(cmd[1] ?? "");
                break;
            case "down":
                depth += parseInt(cmd[1] ?? "");
                break;
            case "":
                break;
            default:
                console.error("Unknown command");
                break;
        }
    }
    return horizontal * depth;
}

export function stage1(arg: string[]) {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    for (const cmd of arg.map((v) => v.split(" "))) {
        switch (cmd[0]) {
            case "forward":
                horizontal += parseInt(cmd[1] ?? "");
                depth += aim * parseInt(cmd[1] ?? "");
                break;
            case "up":
                aim -= parseInt(cmd[1] ?? "");
                break;
            case "down":
                aim += parseInt(cmd[1] ?? "");
                break;
            case "":
                break;
            default:
                console.error("Unknown command");
                break;
        }
    }
    return horizontal * depth;
}
