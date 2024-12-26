import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'build',
	},
	server: {
		proxy: {
			'/api': 'http://localhost:3000',
			'/assets': 'http://localhost:3000',
		},
	},
	resolve: {
		alias: {
			'@': '/src', // Это позволит использовать абсолютные пути в импортах
		},
	},
})
