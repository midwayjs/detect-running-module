const Sequelize = require('sequelize');
const tmpDir = require('os').tmpdir();
const { join } = require('path');

require('@midwayjs/glob');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(tmpDir, 'database.sqlite')
});