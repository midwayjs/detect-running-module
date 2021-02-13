import { join, dirname, sep } from 'path';
import { existsSync } from 'fs';
const debug = require('util').debuglog('detect');

function intersection(setA, setB) {
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

function findBaseDir(baseDir: string) {
  if (existsSync(join(baseDir, 'node_modules'))) {
    return baseDir;
  } else {
    return findBaseDir(dirname(baseDir));
  }
}

export const getRunningDependencies = (baseDir = process.cwd()) => {
  const cacheList = Object.keys(require.cache);
  const usingPkgs = new Set();

  const originBaseDir = baseDir;
  baseDir = findBaseDir(baseDir);

  debug(`baseDir = ${baseDir}, originBaseDir = ${originBaseDir}`);

  for (const modPath of cacheList) {
    const isMatch = modPath.startsWith(join(baseDir, 'node_modules'));
    debug(`isMatch = ${isMatch}, modPath = ${modPath}`);
    if (isMatch) {
      // cnpm
      let result = modPath.match(/node_modules\/_([@\w-]+)@/);
      if (result && result[1]) {
        debug(`using pkg = ${result[1]}`);
        usingPkgs.add(result[1]);
      } else {
        // npm
        result = modPath.match(/node_modules\/([\w@-]+)\//);
        if (result && result[1]) {
          if (result[1].includes('@')) {
            // node_modules/@midwayjs/glob/dist/index.js
            const pkgName = result[1] + '/' + modPath.slice(result.index).split(sep)[2];
            usingPkgs.add(pkgName);
          } else {
            usingPkgs.add(result[1]);
          }
        }
      }
    }
  }

  const pkg = require(join(originBaseDir, 'package.json'));
  const depPkgs = pkg['dependencies'] || {};

  return Array.from(intersection(new Set(Object.keys(depPkgs)), usingPkgs));
}