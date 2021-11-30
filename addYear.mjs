// @ts-check
import fs from "fs";
import path from "path";
import process from "process";

const TSCONFIG = `{
    "extends": "../tsconfig.json"
}
`;
const INDEXTS = `// day§day§: 

export function main() {
    return undefined;
}

`;

const INDEXTESTTS = `import "mocha";
import { expect } from "chai";
import { main } from "./index";

describe("day§day§", () => {
    it("should return ???", () => {
        const result = main();
        expect(result).to.equal(undefined);
    });
});
`;

const year = parseInt(process.argv[2], 10).toString();

if (!(year === process.argv[2] && parseInt(process.argv[2], 10) >= 2015)) {
    throw new Error(
        "You will have to supply a year after 2014 as the first argument.",
    );
}

const folder = path.resolve(year);

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
        INDEXTS.replace("§day§", day),
        "utf8",
    );
    fs.writeFileSync(
        dir + path.sep + "index.test.ts",
        INDEXTESTTS.replace("§day§", day),
        "utf8",
    );
}

// add scripts to package.json

let json = JSON.parse(fs.readFileSync(config, "utf8"));

json["scripts"][`build:${year}`] = `tsc -b ${year}/`;
json["scripts"][`pretest:${year}`] = `npm run build:${year}`;
json["scripts"][`test:${year}`] = `mocha ${year}/**/index.test.js`;

fs.writeFileSync(config, JSON.stringify(json), "utf8");
