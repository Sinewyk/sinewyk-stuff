const { merge } = require('webpack-merge');
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const common = require('../../webpack/common')({
	entry: { website: './src/bootstrap.ts' },
	htmlPlugin: {
		title: "Sinewyk's Stuff",
		author: "Serge 'Sinewyk' Havas",
		keywords: 'sinewyk,blog,functional,programming,random,stuff',
		description: 'Where I create and talk about stuff, my personal playground',
		template: 'public/index.ejs',
	},
	plugins: [
		new FaviconsWebpackPlugin({
			logo: './src/images/reflect_cropped.jpg',
			prefix: '',
			favicons: {
				icons: {
					android: false,
					appleIcon: false,
					appleStartup: false,
					coast: false,
					windows: false,
					yandex: false,
					firefox: false,
				},
			},
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
});
const dev = require('../../webpack/dev')({ port: 8000 });
const prod = require('../../webpack/prod')();

module.exports = process.env.NODE_ENV === 'production' ? merge(common, prod) : merge(common, dev);
