import { execSync } from "child_process";
import { getYears, logger } from "./utils";

const years = getYears(process.argv.slice(2));

build(years);

export default function build(years: number | number[]) {
    if (typeof years === "number") {
        years = [years];
    }
    for (const year of years) {
        try {
            let res = execSync(`tsc -b ./${year}`, { encoding: "utf8" });
            if (res) {
                logger.error(res);
            }
        } catch (error) {
            logger.error(error);
        }
    }
}
