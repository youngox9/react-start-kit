/**
 * source-map獨立文件，包括行和列
 * cheap-module-source-map不包括列
 * eval-source-map性能和安全隱患，只能用於開發階段
 * cheap-module-eval-source-map只有列
 */

const path = require('path');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const devServer = require('./config/devServer');
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
    filename: 'js/[name].[hash].js',  // [name] : entry的key,
    // publicPath設成/，BrowserRouter才不會壞掉
    publicPath: '/',
    chunkFilename: '[name]-[hash].js'
  },
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 300,
  //   poll: 1000, // Check for changes every second
  //   ignored: /node_modules/
  // },
  module: {
    rules: [
      modules.jsRules(true),
      modules.cssRules,
      modules.scssRules,
      modules.imageRules,
      modules.fontRules,
      modules.svgRules,
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
  ],
};

module.exports = merge(
  config,
  resolve,
  optimization,
  plugins('src/index.html'),
  devServer
);
