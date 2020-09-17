const path = require('path');

// 當前目錄： path.resolve(__dirname) || script跑的地方： path.resolve('./src')
module.exports = {
  resolve: {  // 要對哪些資料夾進行resolve，感覺不加也不會壞
    // modules: [
    //   path.resolve(__dirname, '../../src'),
    //   'node_modules'
    // ],
    alias: {
      '~~containers': path.resolve(__dirname, '../../src', 'containers'),
    },
    extensions: [
      '.js',
      '.jsx'
    ]
  }
};
