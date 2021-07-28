<script lang="ts">
	import type { FileDropOptions } from "$lib";

	import FileDrop from "$lib/components";
	let options: FileDropOptions = {};

	globalThis.setOptions = (opts: FileDropOptions) => {
		options = opts;
	};
</script>

<FileDrop {...options} />
