const commonConf = require('./webpack.common');
const webpack = require('webpack');

module.exports = {
	...commonConf,
	mode: 'development',
	target: 'web', // default is browserlist (which will be for prod webpack conf)
	devtool: 'eval',
	module: {
		rules: [
			...commonConf.module.rules,
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: true,
							modules: {
								localIdentName: '[path][name]__[local]',
							},
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [],
							},
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		contentBase: './dist',
		port: 8000,
		historyApiFallback: true,
		overlay: {
			errors: true,
		},
	},
};
