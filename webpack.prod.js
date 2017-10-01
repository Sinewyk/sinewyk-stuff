const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConf = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(commonConf, {
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
  },
  profile: true,
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new StatsPlugin('stats.json'),
    new CompressionPlugin(),
  ],
});
