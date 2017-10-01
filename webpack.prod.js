const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConf = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(commonConf, {
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
});
