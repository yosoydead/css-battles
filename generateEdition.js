import {
  errorText,
  successText,
  infoText,
  cacheFilePath,
  battlesPath,
  refreshCache
} from "./scriptCommons.js";
import fs from "fs";
import path from "path";
import chalk from "chalk";

const log = console.log;

function generateEdition() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0].trim() === "") {
    log(errorText, "Nu ai dat niciun argument sau numele folder-ului e gol.");
    throw new Error();
  }
  log(infoText, "Se pregătește crearea folder-ului.");
  const contents = JSON.parse(fs.readFileSync(cacheFilePath));
  const folderName = `${Object.keys(contents.battles).length + 1}. ${args[0]}`;
  log(infoText, `Numele folder-ului tău va fi: ${chalk.bold.underline(folderName)}`);

  fs.mkdirSync(path.resolve(battlesPath, folderName));
  log(successText, "Folder creat cu succes! Urmează un update de cache.");
  refreshCache();
}

generateEdition();
