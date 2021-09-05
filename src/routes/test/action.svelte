<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import type { FileDropOptions } from "$lib/options";

	export const load: Load = async function ({ page }) {
		const { query } = page;
		function getNumber(key: string): number | undefined {
			const str = query.get(key);
			const n = parseInt(str);
			if (!isNaN(n)) {
				return n;
			}
			return undefined;
		}
		function getBool(key: string): boolean | undefined {
			const b = query.get(key);
			if (b === "true") {
				return true;
			}
			if (b === "false") {
				return false;
			}
			return undefined;
		}
		function getAccept(): string | string[] | undefined {
			const accept = query.getAll("accept").filter((v) => v.length > 0);
			if (accept.length === 1) {
				return accept[0];
			}
			if (accept.length > 1) {
				return accept;
			}
			return undefined;
		}
		const opts: FileDropOptions = {
			accept: getAccept(),
			clickToUpload: getBool("clickToUpload"),
			disabled: getBool("disabled"),
			hideInput: getBool("hideInput"),
			fileLimit: getNumber("fileLimit"),
			maxSize: getNumber("maxSize"),
			minSize: getNumber("minSize"),
			windowDrop: getBool("windowDrop"),
			multiple: getBool("multiple"),
			tabIndex: getNumber("tabIndex"),
		};
		return { props: { opts } };
	};
</script>
