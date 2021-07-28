<script lang="ts">
	import filedrop from "$actions/filedrop";
	import type { Files } from "$lib";
	import fileSize from "filesize";
	import FileDrop from "$lib/components/FileDrop";
	import { element } from "svelte/internal";
	let disabled = false;
	let files: Files;
	let container: HTMLDivElement;
</script>

<h1>FileDrop Examples</h1>

<h2>Action</h2>

<div bind:this={container} class="container">
	<div
		use:filedrop={{ disabled }}
		on:fileselect={(e) => {
			files = e.detail.files;
		}}
		class="filedrop"
	>
		<p>Upload content (action)</p>
		<input type="file" />
	</div>
	<ul>
		{#if files}
			{#each files?.accepted as file}
				<li>{file.name} {fileSize(file.size)}</li>
			{/each}
		{/if}
	</ul>
</div>

<label><input type="checkbox" bind:checked={disabled} /> Disabled</label>

<style>
	.container {
		width: 300px;
	}
	.filedrop {
		background-color: #c3c3c3;
		min-height: 100px;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
	}
	.filedrop input {
		display: none;
	}
	:global(.filedrop.disabled) {
		background-color: #f0f0f0 !important;
		color: #d3d3d3 !important;
	}
</style>
