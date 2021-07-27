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
					$components: path.resolve('./src/components'),
					$lib: path.resolve("./src/lib"),
					$actions: path.resolve('./src/actions')
				}
			}
		},
		target: '#svelte'
	}
};

export default config;
