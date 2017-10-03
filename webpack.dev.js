const merge = require('webpack-merge');
const path = require('path');
const commonConf = require('./webpack.common');

module.exports = merge(commonConf, {
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: '[path]_[name]_[local]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                ctx: {
                  autoprefixer: {},
                  cssnano: {},
                },
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    noInfo: true,
  },
});
