<script lang="ts">
	import type { FileDropOptions } from "$lib";
	import { filedrop } from "$actions";
	let options: FileDropOptions = {};

	globalThis.setOptions = (opts: FileDropOptions) => {
		options = opts;
	};
</script>
