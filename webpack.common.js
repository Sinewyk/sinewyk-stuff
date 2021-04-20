const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

class MyCleanPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap('Clean', (compilation) => {
			fs.rmdirSync(compilation.options.output.path, { recursive: true });
		});
	}
}

module.exports = {
	entry: {
		app: './src/bootstrap.ts',
	},
	plugins: [
		new MyCleanPlugin(),
		new FaviconsWebpackPlugin('./src/images/reflect_cropped.jpg'),
		new HtmlWebpackPlugin({
			title: "Sinewyk's Stuff",
			author: "Serge 'Sinewyk' Havas",
			keywords: 'sinewyk,blog,functional,programming,random,stuff',
			description: 'Where I create and talk about stuff, my personal playground',
			template: 'public/index.ejs',
		}),
		new CopyWebpackPlugin({ patterns: [{ from: 'static', to: '' }] }),
		new webpack.DefinePlugin({
			__LAST_BUILD_TIME__: Date.now(),
			// Dev mode inside @cycle/time or something
			'process.env': {},
			// Dev mode inside @cycle/time or something
			'process.argv': '""',
			process: {},
			assert: require('assert'),
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
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.md$/,
				use: [
					{
						loader: './scripts/gitMetaLoader',
					},
					{
						loader: 'html-loader',
						options: {
							esModule: true,
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
		modules: ['src', 'node_modules'],
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
};
