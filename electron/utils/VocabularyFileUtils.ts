import { Vocabulary } from "../types/Vocabulary";
import fs from "fs";

export function load(filePath: string): Array<Vocabulary> {
  try {
    if (!isFileExist(filePath)) {
      createEmptyFile(filePath);
    }
    const json = fs.readFileSync(`${filePath}/data/vocabulary.json`, { encoding: "utf-8" });
    console.log("Data File loaded successfully");
    return JSON.parse(json);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function save(filePath: string, vocabularysJson: string) {
  try {
    if (!isFileExist(filePath)) {
      createEmptyFile(filePath);
    }
    fs.writeFile(
      `${filePath}/data/vocabulary.json`,
      vocabularysJson,
      { encoding: "utf-8", flag: "w+" },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Data File saved successfully");
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function isFileExist(filePath: string): boolean {
  return fs.existsSync(`${filePath}/data`) && fs.existsSync(`${filePath}/data/vocabulary.json`);
}

function createEmptyFile(filePath: string) {
  fs.mkdirSync(`${filePath}/data`, { recursive: true});
  fs.writeFileSync(
    `${filePath}/data/vocabulary.json`,
    "[]",
    { encoding: "utf-8", flag: "w+" }
  );
}
