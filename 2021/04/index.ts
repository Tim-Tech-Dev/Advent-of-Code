// day04:
import { readFileSync } from "fs";
import { resolve } from "path";

const inputPath = resolve(__dirname, "./input.txt");

export function main() {
    const input = parse(readFileSync(inputPath, "utf8"));
    console.log(
        `Bingo! Our final score is '${stage0(
            input.nums,
            input.boards,
        )}' and if the squid should win we get a score of '${stage1(
            input.nums,
            input.boards,
        )}'.`,
    );
}

export function stage0(nums: number[], boards: number[][][]) {
    let lastNum = -1;
    let winningBoard = -1;

    for (const num of nums) {
        boards = boards.map((board) =>
            board.map((line) => line.filter((v) => v !== num)),
        );

        const winnig = boards.findIndex((board) =>
            board.some((line) => line.length === 0),
        );

        if (winnig !== -1) {
            lastNum = num;
            winningBoard = winnig;
            break;
        }
    }

    const board = boards[winningBoard]?.slice(0, 5);
    const score = lastNum * sum(board);

    return score;
}

export function stage1(nums: number[], boards: number[][][]) {
    let lastNum = -1;

    for (const num of nums) {
        // remove numbers drawn
        boards = boards.map((board) =>
            board.map((line) => line.filter((v) => v !== num)),
        );

        // filter out winning boards
        if (boards.length > 1) {
            boards = boards.filter(
                (board) => !board.some((line) => line.length === 0),
            );
        }

        // check if last board won
        if (boards[0] && boards[0].some((line) => line.length === 0)) {
            lastNum = num;
            break;
        }
    }

    const board = boards[0]?.slice(0, 5);
    const score = lastNum * sum(board);

    return score;
}

export function parse(str: string) {
    const temp = str.split("\n\n");
    const nums =
        temp
            .shift()
            ?.split(",")
            .map((v) => parseInt(v)) ?? [];
    let boards = temp.map((i) =>
        i.split("\n").map((j) =>
            j
                .split(" ")
                .filter((k) => k !== "")
                .map((l) => parseInt(l)),
        ),
    );

    // generate all possible columns and rows
    boards = boards.map((board) =>
        board.concat(
            [0, 1, 2, 3, 4].map((i) => [
                (board[0] ?? [])[i] ?? -1,
                (board[1] ?? [])[i] ?? -1,
                (board[2] ?? [])[i] ?? -1,
                (board[3] ?? [])[i] ?? -1,
                (board[4] ?? [])[i] ?? -1,
            ]),
        ),
    );
    return {
        nums: nums,
        boards: boards,
    };
}

function sum(board?: number[][]) {
    const res = board
        ?.map((v) => {
            if (v.length) {
                return v.reduce((a, b) => a + b);
            } else {
                return 0;
            }
        })
        .reduce((a, b) => a + b);
    return res ? res : 0;
}
