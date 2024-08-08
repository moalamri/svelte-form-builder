import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			$lib: '/src/lib'
		}
	},
	build: {
		rollupOptions: {
			onLog: (level, warning, handler) => {
				if (level === 'warn') return;
				if (warning.loc?.file?.match(/js-sha256\/src\/sha256.js$/)) return;
				if (warning?.code?.toLowerCase().startsWith('a11y')) return;
				if (warning?.code?.toLowerCase().includes('a11y')) return;
				handler(level, warning);
			}
		}
	},

	plugins: [sveltekit()]
});
