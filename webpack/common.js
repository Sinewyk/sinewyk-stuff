const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

class MyCleanPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap('Clean', (compilation) => {
			fs.rmSync(compilation.options.output.path, { recursive: true, force: true });
		});
	}
}

const emptyObject = {};

module.exports = ({ entry, plugins = [], htmlPlugin, output, copyPlugin = emptyObject }) => {
	return {
		entry,
		plugins: [
			new MyCleanPlugin(),
			new HtmlWebpackPlugin({
				...htmlPlugin,
			}),
			copyPlugin === emptyObject
				? null
				: new CopyWebpackPlugin({ patterns: [{ from: copyPlugin.from, to: copyPlugin.to }] }),
			new webpack.DefinePlugin({
				__LAST_BUILD_TIME__: Date.now(),
				// Dev mode inside @cycle/time or something
				'process.env': {},
				// Dev mode inside @cycle/time or something
				'process.argv': '""',
				process: {},
				assert: require('assert'),
			}),
			...plugins,
		].filter((plugin) => !!plugin),
		module: {
			rules: [
				{
					test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
					type: 'asset',
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
			extensions: ['.ts', '.tsx', '.js', '.json'],
			modules: ['src', 'node_modules'],
		},
		output,
	};
};
