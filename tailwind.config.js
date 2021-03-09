module.exports = {
	purge: false,
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		fontFamily: {
			sans: [
				'Tahoma',
				'Verdana',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji',
			],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
};
