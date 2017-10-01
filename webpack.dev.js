const merge = require('webpack-merge');
const path = require('path');
const commonConf = require('./webpack.common');

module.exports = merge(commonConf, {
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    noInfo: true,
  },
});
