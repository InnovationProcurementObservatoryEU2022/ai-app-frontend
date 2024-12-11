import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: 5000,
	},
	preview: {
		port: 5000,
	},
	dev: {
		port: 5000,
	},
	plugins: [sveltekit()]
});
