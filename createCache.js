import {
  battlesPath,
  infoText,
  successText,
  cacheFilePath,
  getDirectories
} from "./scriptCommons.js";
import path from "path";
import chalk from "chalk";
import fs from "fs";

const log = console.log;

export const refreshCache = () => {
  const battleFolders = getDirectories(battlesPath);
  // log(battleFolders);
  const total = battleFolders.reduce((acc, p) => {
    // log(path.resolve(battlesPath, p));
    const x = getDirectories(path.resolve(battlesPath, p), false);
    return acc + x.length;
  }, 0);

  log(infoText, "Ultimul folder de battle:", chalk.underline(battleFolders[battleFolders.length - 1]));
  log(infoText, "Numărul total de chestii terminate:", chalk.underline(total));

  const obj = { battles: {} };
  battleFolders.forEach(b => {
    const a = getDirectories(path.resolve(battlesPath, b), false);
    obj['battles'][b] = a;
  });

  fs.writeFileSync(cacheFilePath, JSON.stringify({...obj, number: total, folder :battleFolders[battleFolders.length - 1]}));
  log(successText, "Am generat fișierului de cache.");
}

refreshCache();