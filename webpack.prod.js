const commonConf = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack');
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
      new TerserPlugin({
        cache: true,
        parallel: true,
        extractComments: true,
        sourceMap: true,
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
              localIdentName: process.env.TESTING
                ? '[path]_[name]_[local]'
                : '[hash:base64]',
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
    new ImageminPlugin({
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
