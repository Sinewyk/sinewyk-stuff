const commonConf = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	...commonConf,
	mode: 'production',
	devtool: 'source-map',
	output: {
		...commonConf.output,
		filename: '[name].[contenthash].js',
	},
	profile: true,
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: true,
			}),
		],
	},
	module: {
		rules: [
			...commonConf.module.rules,
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 1,
							modules: {
								// When testing, keep css name so that we can ... test ?
								localIdentName: process.env.TESTING ? '[path][name]__[local]' : '[hash:base64]',
							},
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									'autoprefixer',
									[
										'cssnano',
										{
											preset: [
												'default',
												{
													discardComments: {
														removeAll: true,
													},
												},
											],
										},
									],
								],
							},
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		...commonConf.plugins,
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif)$/i, // default /\.(jpe?g|png|gif|svg)$/i STOPGAP for pdf.svg not being copied :x
			imageminOptions: {
				plugins: [
					[
						'jpegtran',
						{
							progressive: true,
						},
					],
				],
			},
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
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
