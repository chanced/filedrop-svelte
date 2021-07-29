<script lang="ts">
	import type { FileDropOptions } from "$lib";
	// import { filedrop } from "$lib/actions/filedrop";
	let options: FileDropOptions = {};

	globalThis.setOptions = (opts: FileDropOptions) => {
		options = opts;
	};
</script>
