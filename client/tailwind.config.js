/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/primereact/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				contrastBlue: '#61dafb',
				gold: '#f3ba2f',
			},
		},
	},
	plugins: [],
}
