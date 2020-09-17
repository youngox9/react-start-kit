const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const resolve = require('./config/resolve');
const modules = require('./config/modules');
const optimization = require('./config/optimization');
const plugins = require('./config/plugins');


const config = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    bundle: ['@babel/polyfill', './src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    // url-loader會把檔案路徑指到publicPath下面
    // publicPath: '/static/'  // django 使用
    filename: 'js/[name].[hash].js'  // [name] : entry的key
  },
  module: {
    rules: [
      modules.jsRules(false),
      modules.cssRules,
      modules.scssRules,
      modules.imageRules,
      modules.fontRules,
      modules.svgRules,
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ],
};

module.exports = merge(
  config,
  resolve,
  optimization,
  plugins('src/index.html')
);
