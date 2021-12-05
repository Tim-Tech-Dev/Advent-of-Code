// day03:
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = readFileSync(inputPath, "utf8")
        .split("\n")
        .map((v) => v.split(""));
    console.log(
        `'Analyses of our data suggests that ${stage0(
            input,
        )}' is the power consumption and '${stage1(
            input,
        )}' the life support rating of the submarine.`,
    );
}

export function stage0(arg: string[][]) {
    arg.map((v) => v.reverse());
    const len = arg
        .map((v) => v.length)
        .reduce((prev, cur) => (prev < cur ? cur : prev));

    const gammaArr: string[] = [];
    const epsilonArr: string[] = [];

    for (let i = 0; i < len; i++) {
        gammaArr.push(count(arg, i) < 0 ? "0" : "1");
        epsilonArr.push(count(arg, i) > 0 ? "0" : "1");
    }

    const gamma = gammaArr.reverse().join("");
    const epsilon = epsilonArr.reverse().join("");

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

export function stage1(test: string[][]) {
    test.map((v) => v.reverse());
    let oxygenArr = test;
    let co2Arr = test;
    let i = 0;

    while (oxygenArr.length > 1) {
        const char = count(oxygenArr, i) >= 0 ? "1" : "0";
        oxygenArr = oxygenArr.filter((v) => v[i] === char);
        i++;
    }

    i = 0;

    while (co2Arr.length > 1) {
        const char = count(co2Arr, i) < 0 ? "1" : "0";
        co2Arr = co2Arr.filter((v) => v[i] === char);
        i++;
    }

    // console.log(`${oxygenArr[0]?.join("")}+${co2Arr[0]?.join("")}`);

    return (
        parseInt(oxygenArr[0]?.join("") ?? "", 2) *
        parseInt(co2Arr[0]?.join("") ?? "", 2)
    );
}

function count(arr: string[][], pos: number) {
    let res = 0;
    for (const str of arr) {
        if (str[pos] === "0") {
            res--;
        }
        if (str[pos] === "1") {
            res++;
        }
    }
    return res;
}
