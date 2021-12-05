import { DAYS, getYears } from "./utils";
import { resolve } from "path";
import Mocha from "mocha";
import build from "./build";

const years = getYears(process.argv.slice(2));

test(years);

export default function test(years: number | number[]) {
    if (typeof years === "number") {
        years = [years];
    }

    build(years);

    const mocha = new Mocha();

    for (const year of years) {
        for (const day of DAYS) {
            mocha.addFile(
                resolve(
                    __dirname,
                    "../",
                    year.toString(),
                    day,
                    "index.test.js",
                ),
            );
        }
    }
    mocha.run();
}
