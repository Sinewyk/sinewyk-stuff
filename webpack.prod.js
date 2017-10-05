const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConf = require('./webpack.common');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssExtractor = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  allChunks: false,
});

module.exports = merge(commonConf, {
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
  },
  profile: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssExtractor.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
                modules: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  ctx: {
                    autoprefixer: {},
                    cssnano: {
                      discardComments: { removeAll: true },
                    },
                  },
                },
              },
            },
          ],
        }),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    cssExtractor,
    // Does not natively support es6 stuff, so, it's really breaking my balls
    /* new UglifyJSPlugin({
      sourceMap: true
    }), */
    new BabelMinifyWebpackPlugin(
      {
        removeConsole: true,
        removeDebugger: true,
      },
      { comments: false },
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __LAST_BUILD_TIME__: Date.now(),
    }),
    new StatsPlugin('stats.json'),
    new CompressionPlugin(),
  ],
});
