import { join, dirname } from 'path';
import { existsSync } from 'fs';

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

  for (const modPath of cacheList) {
    if (modPath.startsWith(join(baseDir, 'node_modules'))) {
      const result = modPath.match(/node_modules\/_{0,1}([\w-]+)@/);
      if (result && result[1]) {
        usingPkgs.add(result[1]);
      }
    }
  }

  const pkg = require(join(originBaseDir, 'package.json'));
  const depPkgs = pkg['dependencies'] || {};

  return Array.from(intersection(new Set(Object.keys(depPkgs)), usingPkgs));
}