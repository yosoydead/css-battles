import path from "path";
import fs from "fs";
import chalk from "chalk";
import {
  battlesPath,
  cacheFilePath,
  errorText,
  successText,
  infoText,
  generateFiles,
  getDirectories,
} from "./scriptCommons.js";

const log = console.log;

if (fs.existsSync(cacheFilePath)) {
  log(successText, 'O să mă folosesc de fișierul de cache!');
  const contents = JSON.parse(fs.readFileSync(cacheFilePath));
  const battleFolders = getDirectories(battlesPath);
  const folder = contents.folder;
  const num = contents.number;
  const newFolderFullPath = path.resolve(battlesPath, folder, `${num + 1}`);

  if (folder !== battleFolders[battleFolders.length - 1]) {
    log(errorText, "Observ o diferență între folder-ul din cache și ultimul folder detectat.")
    log(infoText, 'Cache-ul se va regenera.');
    generateFiles(path.resolve(battlesPath, battleFolders[battleFolders.length - 1], `${num+1}`));
    contents.battles[battleFolders[battleFolders.length - 1]] = [`${num + 1}`];
    const newCache = {
      ...contents,
      folder: battleFolders[battleFolders.length - 1],
      number: num + 1
    }
    fs.writeFileSync(cacheFilePath, JSON.stringify(newCache));
  } else {
    log(infoText, `Folder-ul în care se va genera următorul battle: ${chalk.underline(folder)} cu numărul: ${chalk.underline(num + 1)}`);
    generateFiles(newFolderFullPath);
    contents.battles[folder].push(`${num + 1}`);
    fs.writeFileSync(cacheFilePath, JSON.stringify({...contents, folder, number: num+1 }));
    log(successText, "Am făcut update fișierului de cache.");
  }
  log(successText, 'Am reușit să creez folderul și fișierele necesare.')
} else {
  log(errorText, chalk.bold("Nu am cache file!"), 'Asigură-te că nu ai șters/redenumit fișierul.');
  throw new Error();
}
