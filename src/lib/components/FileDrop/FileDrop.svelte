<script lang="ts">
	import filedrop from "$lib/actions/filedrop";
	import { fromEvent as filesFromEvent } from "file-selector";
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { isString, isArrayOfStrings } from "$lib/util";
	import type { Events } from "$lib/event";
	import type { FileDropOptions } from "$lib/options";
	export let id: string = undefined;
	export let disableStyles = false;
	export let style: string = $$props.style;
	export let containerClass = $$props.class as string | undefined;
	export let accept: string | string[] = undefined;
	export let multiple: boolean = undefined;
	export let disabled: boolean = undefined;
	export let maxSize: number = undefined;
	export let minSize: number = undefined;
	export let fileLimit: number = undefined;
	export let clickToUpload = true;
	export let input: HTMLInputElement = undefined;
	$: {
		let options: FileDropOptions = {
			id,
			style,
			accept,
			disabled,
			clickToUpload,
			maxSize,
			minSize,
			input,
			fileLimit,
			multiple,
		};
	}
	$: isMulti = (fileLimit === undefined || fileLimit > 1) && (multiple === undefined || multiple);
	const dispatch = createEventDispatcher<Events>();

	function proxy<T extends keyof Events, D extends Events[T] = Events[T]>(type: T): ({ detail: D }) => void {
		return function ({ detail }) {
			dispatch(type, detail);
		};
	}
</script>

<div
	{id}
	class:filedrop={!containerClass}
	use:filedrop
	on:filedrop={proxy("filedrop")}
	on:filedialogcancel={proxy("filedialogcancel")}
	on:filedialogclose={proxy("filedialogclose")}
	on:filedialogopen={proxy("filedialogopen")}
	on:filedragenter={proxy("filedragenter")}
	on:filedragleave={proxy("filedragleave")}
	on:filedragover={proxy("filedragover")}
	on:windowfiledragenter={proxy("windowfiledragenter")}
	on:windowfiledragleave={proxy("windowfiledragleave")}
	on:windowfiledragover={proxy("windowfiledragover")}
>
	<input type="file" />
	<slot>
		<p>Drag &amp; drop or click to upload {isMulti ? "files" : "a file "}</p>
	</slot>
</div>
{#if !!disableStyles && !containerClass}
	<style>
		.filedrop {
			background-color: #f0f0f0;
			height: 200px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: 0.375rem;
			border: 1.3em dashed #c3c3c3;
			outline: 3.2em solid #f0f0f0;
			transition: border 0.3s ease-in-out;
			outline-offset: -3.4em;
		}
		.filedrop:focus {
			border-color: #2196f3;
		}
		.filedrop:hover {
			border-color: #343434;
		}
		.filedrop p,
		.filedrop svg {
			transition: color 0.1s;
			transition: fill 0.1s;
		}
		.filedrop:focus p,
		.filedrop:focus svg {
			color: #2196f3;
			fill: #2196f3;
		}
		.filedrop:hover p,
		.filedrop:hover svg {
			color: #343434;
			fill: #343434;
		}
		p {
			color: #787878;
			font-size: 1.2em;
			cursor: default;
			align-content: center;
		}
		svg {
			fill: #787878;
			display: block;
		}
	</style>
{/if}
