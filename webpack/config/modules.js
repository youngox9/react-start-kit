const jsRules = (withEslint) => {
  let use = [{ loader: 'babel-loader', }];
  if (withEslint) {
    use = [
      ...use,
      {
        loader: 'eslint-loader',
        options: {
          cache: true,
          quiet: true,
        },
      },
    ];
  }
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use
  };
};


const cssRules = {
  // postcss-loader幫CSS加前綴 css-loader讓webpack 可以讀css內容，style-loader把css加樣式
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        importLoaders: true,
      },
    },
    // { loader: 'postcss-loader' },
  ],
};

const scssRules = {
  test: /\.scss$/,
  use: [{
    loader: 'style-loader',
    options: {
      sourceMap: true,
    },
  }, {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: true,
      localIdentName: '[path]__[name]__[local]___[hash:base64:5]',
      sourceMap: true,
    },
  },
  {
    loader: 'resolve-url-loader',
  }, {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  }],
};

const imageRules = {
  test: /\.(jpe?g|png|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 40000, // 單位：byte  40k以下都會被編成base64，以上就變成檔案
        name: 'img/[hash].[ext]',
      },
    },
    // {
    //   loader: 'image-webpack-loader',
    //   options: {
    //     bypassOnDebug: true,
    //   }
    // }
  ],
};


const fontRules = {
  test: /\.(woff|woff2|ttf|eot)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        limit: 40000, // 單位：byte  40k以下都會被編成base64，以上就變成檔案
        name: 'fonts/[hash].[ext]',
      },
    },
  ],
};

const svgRules = {
  test: /\.(svg)$/,
  use: [
    {
      loader: 'svg-inline-loader?removeTags=true&removingTags=["title", "desc"]&classPrefix=[name]_[hash:base64:5]'
    }
  ]
};


module.exports = {
  jsRules: (withEslint) => jsRules(withEslint),
  cssRules,
  scssRules,
  imageRules,
  fontRules,
  svgRules,
};

