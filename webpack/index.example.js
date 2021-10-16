const { merge } = require('webpack-merge');

const common = require('./common')();
const dev = require('./dev')();
const prod = require('./prod')();

module.exports = process.env.NODE_ENV === 'production' ? merge(common, prod) : merge(common, dev);
