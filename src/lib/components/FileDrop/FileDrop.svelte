<script lang="ts">
	import filedrop from "$lib/actions/filedrop";
	import { fromEvent as filesFromEvent } from "file-selector";
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { isString, isArrayOfStrings } from "$lib/util";
	import type { Events } from "$lib/event";
	export let id: string = undefined;
	export let disableStyles = false;
	export let style: string = undefined;
	export let tabIndex: number = 0;
	export let containerClass = $$props.class as string | undefined;
	export let accept: string | string[] = undefined;
	export let multiple: boolean = false;
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher<Events>();
	let container: HTMLDivElement;
	let input: HTMLInputElement;

	let isFocused = false;
	let isDragAccept = false;
	let isDragActive = false;
	let isDragReject = false;
	let isFileDialogActive = false;
	let acceptTypes: string[] | undefined;

	$: {
		if (isString(accept)) {
			acceptTypes = accept.split(",");
		} else if (isArrayOfStrings(accept)) {
			acceptTypes = accept;
		} else {
			acceptTypes = undefined;
		}
	}

	function onInput(ev: InputEvent) {
		// dispatch("dialogopen", baseEvent);
		ev.stopPropagation();
	}

	export function setTabIndex(value: number): void {
		tabIndex = value;
	}
	export function setMultiple(value: boolean): void {
		multiple = value;
	}
	export function setStyle(value: string | undefined): void {
		style = value;
	}
	export function setAccept(value: string | string[] | undefined): void {
		if (value === null || value === undefined || value === "") {
			accept = undefined;
			return;
		}
		if (isString(value)) {
			accept = value;
			return;
		}
		if (isArrayOfStrings(value)) {
			accept = value.join(" ");
			return;
		}
		if (isString(value)) {
			accept = value;
			return;
		}
	}
	export function disable(): void {
		if (!disabled) {
			disabled = true;
		}
	}

	export function enable(): void {
		if (disabled) {
			disabled = false;
		}
	}

	export function setContainerClass(value: string | string[] | null | undefined): void {
		if (value === null || value === undefined) {
			containerClass = undefined;
			return;
		}
		if (isString(value)) {
			containerClass = value;
			return;
		}
		if (isArrayOfStrings(value)) {
			containerClass = value.join(",");
		}
		if (isString(value)) {
			containerClass = value;
			return;
		}
		containerClass = value.toString();
	}
</script>

<!-- <div
	bind:this={container}
	class={containerClass}
	{tabIndex}
	{style}
	on:keydown={handleKeyDown}
	on:focus={handleFocus}
	on:blur={handleBlur}
	on:click={handleClick}
	on:dragenter={handleDragEnter}
	on:dragover={handleDragOver}
	on:dragleave={handleDragLeave}
	on:drop={handleDrop}
> -->

<div
	use:filedrop
	on:fileselect={(ev) => {
		console.log(ev.detail.files);
	}}
	{id}
>
	<input
		accept={acceptTypes.join(",")}
		{multiple}
		type="file"
		autocomplete="off"
		tabindex="-1"
		on:change={(onFileSelection) => {}}
		on:click={(onInputClick) => {}}
		bind:this={input}
	/>
	<input type="file" />

	<slot>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"
			><path fill="none" d="M0 0h24v24H0z" /><path
				d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 13v4h-2v-4H8l4-5 4 5h-3z"
			/></svg
		>
		<p>Upload content</p>
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
