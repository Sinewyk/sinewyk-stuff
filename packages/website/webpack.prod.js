const commonConf = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const purgecss = require('@fullhuman/postcss-purgecss');

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
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									'tailwindcss',
									'autoprefixer',
									purgecss({
										content: [
											'./components/**/*.ts',
											'./pages/**/*.ts',
											'./src/**/*.ts',
											'./public/index.ejs',
										],
										safelist: ['blockquote'],
										keyframes: true,
										variables: true,
										fontFace: true,
										defaultExtractor: (content) => content.match(/[\.\:A-Za-z0-9_-]+/g) || [],
									}),
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
		new ImageMinimizerPlugin({
			minimizerOptions: {
				// Lossless optimization with custom option
				// Feel free to experiment with options for better result for you
				plugins: [
					['gifsicle', { interlaced: true }],
					['jpegtran', { progressive: true }],
					['optipng', { optimizationLevel: 5 }],
					// Svgo configuration here https://github.com/svg/svgo#configuration
					'svgo',
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
