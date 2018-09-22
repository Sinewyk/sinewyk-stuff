const webpack = require('webpack');
const commonConf = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ImageminWebpackPlugin } = require('imagemin-webpack');
const imageminJpegtran = require('imagemin-jpegtran');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  ...commonConf,
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  profile: true,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: true,
        warningsFilter: () => true,
      }),
    ],
  },
  module: {
    rules: [
      ...commonConf.module.rules,
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              // When testing, keep css name so that we can ... test ?
              [process.env.TESTING
                ? 'localIdentName'
                : 'who_cares']: '[path]_[name]_[local]',
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
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    ...commonConf.plugins,
    new ImageminWebpackPlugin({
      imageminOptions: {
        plugins: [
          imageminJpegtran({
            progressive: true,
          }),
        ],
      },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
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
};
