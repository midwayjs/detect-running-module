import { getRunningDependencies, getModuleNameByPath } from '../src';
import { join } from 'path';

describe('/index.test.js', () => {

  it('npm and cnpm path case', () => {
    expect(getModuleNameByPath('/workspace/detect-running-module/node_modules/wide-align/node_modules/is-fullwidth-code-point/index.js')).toEqual('wide-align');
    expect(getModuleNameByPath('/workspace/detect-running-module/node_modules/wide-align/align.js')).toEqual('wide-align');
    expect(getModuleNameByPath('/workspace/detect-running-module/node_modules/object-assign/index.js')).toEqual('object-assign');
    expect(getModuleNameByPath('/workspace/detect-running-module/node_modules/sqlite3/lib/sqlite3.js')).toEqual('sqlite3');
    expect(getModuleNameByPath('/workspace/detect-running-module/node_modules/@midwayjs/glob/dist/index.js')).toEqual('@midwayjs/glob');
    expect(getModuleNameByPath('/Users/harry/project/detect-running-module/node_modules/_@babel_code-frame@7.12.13@@babel/code-frame/package.json')).toEqual('@babel/code-frame');
    expect(getModuleNameByPath('/Users/harry/project/detect-running-module/node_modules/_@midwayjs_cli-plugin-add@1.2.40@@midwayjs/cli-plugin-add/dist/index.js')).toEqual('@midwayjs/cli-plugin-add');
    expect(getModuleNameByPath('/Users/harry/project/detect-running-module/node_modules/_@koa_router@10.0.0@@koa/router/lib/layer.js')).toEqual('@koa/router');
    expect(getModuleNameByPath('/Users/harry/project/detect-running-module/node_modules/_address@1.1.2@address/lib/address.js')).toEqual('address');
    expect(getModuleNameByPath('/Users/harry/project/detect-running-module/node_modules/_buffer@5.7.1@buffer/index.js')).toEqual('buffer');
    expect(getModuleNameByPath('/Users/harry/project/detect-running-module/node_modules/_cache-base@1.0.1@cache-base/index.js')).toEqual('cache-base');
  });

  it('test got module from cahce and package.json', () => {
    require('./fixtures/base-app/index');
    expect(getRunningDependencies(join(__dirname, './fixtures/base-app'))).toEqual([
      'sequelize',
      "@midwayjs/glob",
      'sqlite3'
    ])
  });
});