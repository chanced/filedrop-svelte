<script lang="ts">
	import filedrop from "../../actions/filedrop";
	import { fromEvent as filesFromEvent } from "file-selector";
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import type { Events } from "../../event";
	import type { FileDropOptions } from "../../options";
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
	let options: FileDropOptions = {};
	$: {
		options = {
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

	function proxy<T extends keyof Events, E extends CustomEvent<Events[T]> = CustomEvent<Events[T]>>(
		type: T,
	): (ev: E) => void {
		return function (ev) {
			ev.stopPropagation();
			dispatch(type, ev.detail);
		};
	}
</script>

<div
	{id}
	class:filedrop={!containerClass}
	use:filedrop={options}
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
		<p>Drag &amp; drop or select to upload {isMulti ? "files" : "a file "}</p>
	</slot>
</div>
{#if !disableStyles && !containerClass}
	<style>
		.filedrop {
			background-color: #f0f0f0;
			height: 200px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: 0.375rem;
			border: 0.7em dashed #c3c3c3;
			outline: 1em solid #f0f0f0;
			transition: border 0.3s ease-in-out;
			outline-offset: -1.3em;
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
			color: #373737;
			font-size: 1.2em;
			cursor: default;
			align-content: center;
		}
	</style>
{/if}
