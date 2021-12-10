import { resolve } from "path";
import { Worker } from "worker_threads";
import { green, blue, yellow, grey, gray } from "chalk";
import stripAnsi from "strip-ansi";
import { getYears } from "./utils";

const years = getYears(process.argv);

console.time("Execution took");
console.clear();

const output: Map<number, string[]> = new Map();

function replace(str: string) {
    let values = 0;
    let bool1 = true;
    let bool2 = true;

    let res = str
        .split("'")
        .reduce((a, b) => {
            if (bool1) {
                bool1 = false;
                values++;
                return a + blue(b);
            } else {
                bool1 = true;
                return a + b;
            }
        })
        .split('"')
        .reduce((a, b) => {
            if (bool2) {
                bool2 = false;
                values++;
                return a + green(b);
            } else {
                bool2 = true;
                return a + b;
            }
        });
    values = values > 2 ? 2 : values;
    return yellow("".padStart(values, "*")) + " " + res;
}

function wrap(str: string, length: number) {
    const res: string[] = [];

    for (const paragraph of str.split("\n")) {
        const words = paragraph.split(" ").filter((v) => v !== "");
        let temp = words[0] ?? "";

        for (let i = 1; i < words.length; i++) {
            const word = words[i] ?? "";
            if (stripAnsi(temp).length + stripAnsi(word).length + 1 < length) {
                temp += ` ${word}`;
            } else {
                res.push(temp);
                temp = word;
            }
        }

        if (temp !== "") {
            res.push(temp);
        }
    }

    return res;
}

function log(output: Map<number, string[]>) {
    output.forEach((arr, year) => {
        console.log(gray(`------ ${year} ------`));
        arr.forEach((str, i) => {
            if (str) {
                const day = i.toString(10).padStart(2, "0");

                wrap(replace(str), 68).forEach((str, i) => {
                    if (i === 0) {
                        console.log(grey(`[${year}-${day}]: `) + `${str}`);
                    } else {
                        console.log("".padStart(11) + str);
                    }
                });
            }
        });
    });
}

let deployedWorkes = 0;

async function update() {
    console.clear();
    log(output);
    if (deployedWorkes === 0) {
        console.timeLog("Execution took");
    } else {
        console.log(`${deployedWorkes} threads deployed!`);
    }
}

for (const year of years) {
    output.set(year, Array(25).fill(""));
    for (let i = 1; i <= 25; i++) {
        const day = i.toString(10).padStart(2, "0");
        const path = resolve(__dirname, "../", year.toString(), day);

        const worker = new Worker(`require('${path}').main()`, {
            eval: true,
            stdout: true,
        });
        deployedWorkes++;
        update();
        worker.stdout.setEncoding("utf8");

        worker.on("exit", (exitCode: number) => {
            if (exitCode === 0) {
                const data = output.get(year) ?? [];
                data[i] = worker.stdout.read();
                output.set(year, data);
            }
            deployedWorkes--;
            update();
        });
    }
}
