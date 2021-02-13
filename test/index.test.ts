import { getRunningDependencies } from '../src';
import { join } from 'path';

describe('/index.test.js', () => {
  it('test got module from cahce and package.json', () => {
    require('./fixtures/base-app/index');
    expect(getRunningDependencies(join(__dirname, './fixtures/base-app'))).toEqual([
      'sequelize',
      "@midwayjs/glob",
      'sqlite3'
    ])
  });
});