const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: {
    app: './public/bootstrap.ts',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new FaviconsWebpackPlugin('./public/reflect_cropped.jpg'),
    new HtmlWebpackPlugin({
      title: "Sinewyk's Stuff",
      template: 'public/index.ejs',
    }),
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }, {
      test: /\.md$/,
      use: [{
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
    }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};