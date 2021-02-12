# 获取运行时模块

探测运行时在 package.json 依赖中真实使用的模块，并和当前 package.json 做交集，用于获取实际的模块，方便前后端依赖分离。

## API

```js
const { getRunningDependencies } = require('detect-running-module');

const runnineModules = getRunningDependencies();

// output ['xxxx', 'xxxx']