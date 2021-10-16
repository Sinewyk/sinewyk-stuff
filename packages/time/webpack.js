const { merge } = require('webpack-merge');
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const common = require('../../webpack/common')({
	entry: { time: './src/index.ts' },
	htmlPlugin: {
		title: 'Time',
		author: "Serge 'Sinewyk' Havas",
		keywords: '',
		description: '',
		template: 'public/index.ejs',
	},
	// copyPlugin: {
	// 	from: 'static',
	// 	to: '',
	// },
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
});
const dev = require('../../webpack/dev')({ port: 8001 });
const prod = require('../../webpack/prod')();

module.exports = process.env.NODE_ENV === 'production' ? merge(common, prod) : merge(common, dev);
