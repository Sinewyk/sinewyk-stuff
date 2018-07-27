const webpack = require('webpack');
const commonConf = require('./webpack.common');
const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  ...commonConf,
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
  },
  profile: true,
  module: {
    rules: [...commonConf.module.rules, {
      test: /\.css$/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it use publicPath in webpackOptions.output
            publicPath: '../'
          }
        }, {
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
      exclude: /node_modules/,
    }],
  },
  plugins: [
    ...commonConf.plugins,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new BabelMinifyWebpackPlugin({
      removeConsole: true,
      removeDebugger: true,
    }, {
      comments: false,
    }, ),
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