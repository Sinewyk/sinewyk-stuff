module.exports = ({ port = 8000 }) => ({
	mode: 'development',
	target: 'web', // default is browserlist (which will be for prod webpack conf)
	devtool: 'eval',
	module: {
		rules: [
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
		port,
		historyApiFallback: true,
		client: {
			overlay: {
				errors: true,
			},
		},
	},
});
