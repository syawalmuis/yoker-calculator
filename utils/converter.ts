import { execFileSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";

export const JSONToFile = (obj: object, filename: string) =>
    writeFileSync(
        `public/games/${filename}.json`,
        JSON.stringify(obj, null, 2)
    );

export const FileToJSON = (filename: string) => {
    const file = `public/games/${filename}.json`;
    if (!existsSync(file)) return false;
    return readFileSync(file, {
        encoding: "utf8",
        flag: "r",
    });
};
