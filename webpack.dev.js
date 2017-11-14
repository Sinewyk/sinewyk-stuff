const merge = require('webpack-merge');
const path = require('path');
const commonConf = require('./webpack.common');
const webpack = require('webpack');

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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __LAST_BUILD_TIME__: Date.now(),
    }),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    noInfo: true,
    port: 8000,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
});
