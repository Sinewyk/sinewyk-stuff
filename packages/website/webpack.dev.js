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
							sourceMap: true,
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['tailwindcss'],
							},
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		static: {
			directory: './dist',
		},
		port: 8000,
		historyApiFallback: true,
		client: {
			overlay: {
				errors: true,
			},
		},
	},
};
