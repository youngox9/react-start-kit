const precss = require('precss')
// 加入各瀏覽器前綴
const autoprefixer = require('autoprefixer')
// 在每隻前面加normalize.css
// const pcss_normalize = require('postcss-normalize');
const postcss_import = require('postcss-import');
// 把相同的媒體查詢合併
const css_mqpacker = require('css-mqpacker');
// 壓縮代碼
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    precss,
    autoprefixer,
    // pcss_normalize,
    postcss_import,
    css_mqpacker,
    cssnano,
  ]
}