const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: {
    app: './public/bootstrap.ts',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FaviconsWebpackPlugin('./public/reflect_cropped.jpg'),
    new HtmlWebpackPlugin({
      title: "Sinewyk's Stuff",
      author: "Serge 'Sinewyk' Havas",
      keywords: 'sinewyk,blog,functional,programming,random,stuff',
      description:
        'Where I create and talk about stuff, my personal playground',
      template: 'public/index.ejs',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: './scripts/gitMetaLoader',
            options: {
              foo: 'bar',
            },
          },
          {
            loader: 'html-loader',
            options: {
              exportAsEs6Default: true,
            },
          },
          'markdown-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};
