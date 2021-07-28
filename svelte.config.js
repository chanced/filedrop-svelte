import preprocess from 'svelte-preprocess';
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/lib/components'),
					$actions: path.resolve('./src/lib/actions'),
					$stores: path.resolve("./src/lib/stores")
				}
			},

		},
		target: '#svelte'
	}
};

export default config;
