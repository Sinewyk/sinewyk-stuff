const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConf = require('./webpack.common');
const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

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
                      discardComments: {
                        removeAll: true,
                      },
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
    new BabelMinifyWebpackPlugin(
      {
        removeConsole: true,
        removeDebugger: true,
      },
      {
        comments: false,
      },
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __LAST_BUILD_TIME__: Date.now(),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: {
        source: false,
      },
    }),
    new CompressionPlugin(),
  ],
});
