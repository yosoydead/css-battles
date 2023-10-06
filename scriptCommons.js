import path from "path";
import chalk from "chalk";
import { fileURLToPath } from 'url';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const rootPath = __dirname;
const rootPath = __dirname;
const battlesPath = path.resolve(rootPath, 'src', 'battles');
const cacheFilePath = path.resolve(rootPath, ".cache");

const errorText = chalk.bold.red('Eroare!');
const successText = chalk.bold.green("Succes!");
const warningText = chalk.bold.yellow("Atenție!");
const infoText = chalk.underline.blueBright("Info!");

const log = console.log;
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  inca nu e facuta
</body>
</html>`;

const css = `* {
  margin: 0;
  padding: 0;
}

body {
  width: 400px;
  height: 300px;
  border: 1px solid #fff; /* să se vadă containerul adevărat */

  /* inserează restul de css pt body */
}

/* continuă cu css pt elemente 😊 */

`;

const getDirectories = (source, sort = true) => {
  const filter = fs.readdirSync(source, {withFileTypes: true})
    .filter(p => p.isDirectory() && (p.name !== '.git' && p.name !== 'node_modules' && p.name !== 'public' && p.name !== 'src'))
    
    if (sort) {
      filter.sort(function(a, b) {
        const pa = path.resolve(source, a.name);
        const pb = path.resolve(source, b.name);
  
        return fs.statSync(pa).birthtimeMs - fs.statSync(pb).birthtimeMs;
      });
    }
    return filter.map(p => p.name);
};

const generateFiles = (whereTo) => {
  log(infoText, "Se generează folder-ul și fișierele.")
  const battleHtml = path.resolve(whereTo, 'index.html');
  const battleCss = path.resolve(whereTo, 'index.css');

  fs.mkdirSync(whereTo);

  [
    {
      content: html,
      path: battleHtml
    },
    {
      content: css,
      path: battleCss
    }
  ].forEach(obj => {
    fs.writeFileSync(obj.path, obj.content);
  });
};

const refreshCache = () => {
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

  fs.writeFileSync(cacheFilePath, JSON.stringify({...obj, number: total, folder: battleFolders[battleFolders.length - 1]}));
  log(successText, "Am generat fișierului de cache.");

  return obj;
}

export {
  rootPath,
  battlesPath,
  cacheFilePath,
  errorText,
  successText,
  warningText,
  infoText,
  html,
  css,
  getDirectories,
  generateFiles,
  refreshCache
}