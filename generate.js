const path = require("path");
const fs = require("fs");
const chalk = require('chalk');

const rootPath = __dirname;
const errorText = chalk.bold.red('Eroare!');
const successText = chalk.bold.green("Succes!");

const getDirectories = source =>
  fs.readdirSync(source, {withFileTypes: true})
    .filter(p => p.isDirectory() && p.name !== '.git')
    .map(p => p.name);

const argumentsPassed = process.argv.slice(2); 
const battleRootFolder = argumentsPassed[0];
const newBattleFolder = argumentsPassed[1];

if (!getDirectories(rootPath).includes(battleRootFolder)) {
  const folderName = chalk.bold.underline(battleRootFolder);
  console.log(`${errorText} BattleRootFolder nu exista: ${folderName}.`)
  throw new Error();
}

const folder = path.resolve(rootPath, battleRootFolder);
if (getDirectories(folder).includes(newBattleFolder)) {
  const folderName = chalk.bold.underline(newBattleFolder);
  console.log(`${errorText} NewBattleFolder deja exista: ${folderName}.`)
  throw new Error();
}

// creez dir inauntru
const newBattle = path.resolve(rootPath, battleRootFolder);
const newFolder = path.resolve(newBattle, newBattleFolder);

const battleHtml = path.resolve(newFolder, 'index.html');
const battleCss = path.resolve(newFolder, 'index.css');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
</body>
</html>`;

const css = `* {
  margin: 0;
  padding: 0;
}

body {
  width: 400px;
  height: 300px;
}`;

fs.mkdirSync(newFolder);

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

console.log(successText, 'Am reușit să creez folderul și fișierele necesare.')