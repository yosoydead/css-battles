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

export {
  rootPath,
  battlesPath,
  cacheFilePath,
  errorText,
  successText,
  warningText,
  infoText,
  getDirectories,
}