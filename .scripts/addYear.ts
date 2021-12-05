import * as fs from "fs";
import * as path from "path";
import * as process from "process";

const TSCONFIG = `{
    "extends": "../tsconfig.json"
}
`;

const INDEXTS = `// day§day§: 
// import { readFileSync } from "fs";
// import { resolve } from "path";

// const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    // const input = readFileSync(inputPath, "utf8");
    // console.log(\`day§day§: Answer.\`)
}
export function stage0(arg: any) {
    arg;
    return undefined;
}

export function stage1(arg: any) {
    arg;
    return undefined;
}
`;

const INDEXTESTTS = `// import "mocha";
// import { expect } from "chai";
// import { stage0, stage1 } from "./index";
// 
// describe("day§day§", () => {
//     it("Not defiend yet", () => {
//         const input = "";
//         const res = stage0(input);
//         expect(res).to.equal(undefined);
//     });
//
//     it("Not defiend yet", () => {
//         const input = "";
//         const res = stage1(input);
//         expect(res).to.equal(undefined);
//     });
// });
`;

const year = parseInt(process.argv[2] ?? "", 10).toString();

if (!(year === process.argv[2] && parseInt(process.argv[2], 10) >= 2015)) {
    throw new Error(
        "You will have to supply a year after 2014 as the first argument.",
    );
}

const folder = path.resolve("../", year);

if (fs.existsSync(folder)) {
    throw new Error(`${folder} already exists.`);
}

const config = path.resolve("package.json");

if (!fs.existsSync(config)) {
    throw new Error(`${config} does not exist.`);
}

fs.mkdirSync(folder);
fs.writeFileSync(folder + path.sep + "tsconfig.json", TSCONFIG, "utf8");

for (let i = 1; i <= 25; i++) {
    const day = i.toString(10).padStart(2, "0");
    const dir = folder + path.sep + day;
    fs.mkdirSync(dir);
    fs.writeFileSync(
        dir + path.sep + "index.ts",
        INDEXTS.replace(/§day§/gm, day),
        "utf8",
    );
    fs.writeFileSync(
        dir + path.sep + "index.test.ts",
        INDEXTESTTS.replace(/§day§/gm, day),
        "utf8",
    );
    fs.writeFileSync(dir + path.sep + "input.txt", "", "utf8");
}

// add scripts to package.json

const json = JSON.parse(fs.readFileSync(config, "utf8"));

json["scripts"][`build:${year}`] = `npm run build ${year}`;
json["scripts"][`test:${year}`] = `npm run test ${year}`;
json["scripts"][`start:${year}`] = `npm run start ${year}`;

fs.writeFileSync(config, JSON.stringify(json), "utf8");
