
const development = require('./webpack.dev');
const production = require('./webpack.prod');
const e2e = require('./webpack.e2e');
const test = require('./webpack.test');

module.exports = {
  development,
  production,
  test,
  e2e,
};
