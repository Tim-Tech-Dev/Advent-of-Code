import { Logger } from "tslog";
import { Dirent, opendirSync } from "fs";
import { resolve } from "path";

export const logger = new Logger();

export function getYears(argv: string[]) {
    let years: number[] = [];
    try {
        let dir = opendirSync(resolve(__dirname, "../"));
        let item: Dirent | null;
        while ((item = dir.readSync())) {
            if (item.isDirectory()) {
                let int = parseInt(item.name);
                if (int.toString() === item.name && int >= 2015) {
                    years.push(parseInt(item.name));
                }
            }
        }
        dir.closeSync();
    } catch (error) {
        logger.error(error);
    }

    if (argv.length === 0) {
        logger.warn(
            `Expected a year or 'all' as an argument. Got none I assume you wanted 'all'.`,
        );
        return years.sort();
    }

    if (argv.includes("all")) {
        return years.sort();
    }

    for (const arg of argv.map((v) => parseInt(v))) {
        if (!years.includes(arg)) {
            logger.error(
                `Expected year after 2014, which is in the dir, or 'all'. Got:`,
                arg,
            );
        }
    }

    return argv
        .map((v) => parseInt(v))
        .filter((v) => years.includes(v))
        .sort();
}

export const DAYS = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
];
