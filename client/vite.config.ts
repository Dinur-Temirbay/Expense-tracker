import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	base: '/',
	plugins: [
		react(),
		tailwindcss(),
		babel({ presets: [reactCompilerPreset()] }),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@layout': path.resolve(__dirname, './src/components/layout'),
			'@ui': path.resolve(__dirname, './src/components/ui'),
			'@sections': path.resolve(__dirname, './src/sections'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@data': path.resolve(__dirname, './src/data'),
			'@types': path.resolve(__dirname, './src/types'),
			'@context': path.resolve(__dirname, './src/context'),
		},
	},
})
