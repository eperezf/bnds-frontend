const colors = require('tailwindcss/colors')

const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
	darkMode: 'media'
};

module.exports = config;
