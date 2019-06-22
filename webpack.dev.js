const commonConf = require('./webpack.common');
const webpack = require('webpack');

module.exports = {
  ...commonConf,
  mode: 'development',
  devtool: 'eval',
  module: {
    rules: [
      ...commonConf.module.rules,
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
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
  plugins: [...commonConf.plugins, new webpack.NamedModulesPlugin()],
  devServer: {
    contentBase: './dist',
    port: 8000,
    historyApiFallback: true,
    overlay: {
      errors: true,
    },
  },
};
