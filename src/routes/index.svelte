<script lang="ts">
    import type { Files } from "$lib";
    import FileDrop, { filedrop } from "$lib";
    let disabled = false;
    let actionFiles: Files;
    let compFiles: Files;
    let container: HTMLDivElement;

    let fileLimit = null;
    let maxSize = null;
    let minSize = null;
</script>

<h1>FileDrop Examples</h1>
<h2>Component</h2>
<div class="container">
    <FileDrop
        on:filedrop={(ev) => {
            compFiles = ev.detail.files;
        }}
        {fileLimit}
        {maxSize}
        {minSize}
    />
    {#if compFiles}
        <h3>Accepted Files</h3>
        <ul>
            {#each compFiles?.accepted as file}
                <li><span>{file.name}</span> - <em>{file.size}</em></li>
            {/each}
        </ul>
        <h3>Rejected files</h3>
        <ul>
            {#each compFiles?.rejected as rejected}
                <li>
                    <span>{rejected.file.name}</span> - {rejected.error.message}
                </li>
            {/each}
        </ul>
    {/if}
</div>

<div bind:this={container} class="container">
    <div
        use:filedrop={{ disabled, fileLimit, maxSize, minSize }}
        on:filedrop={(e) => {
            actionFiles = e.detail.files;
        }}
        class="filedrop"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"
            ><path fill="none" d="M0 0h24v24H0z" /><path
                d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 13v4h-2v-4H8l4-5 4 5h-3z"
            /></svg
        >
        <p>Upload content (action)</p>
    </div>
    {#if actionFiles}
        <h3>Accepted Files</h3>
        <ul>
            {#each actionFiles?.accepted as file}
                <li><span>{file.name}</span> - <em>{file.size}</em></li>
            {/each}
        </ul>
        <h3>Rejected files</h3>
        <ul>
            {#each actionFiles?.rejected as rejected}
                <li>
                    <span>{rejected.file.name}</span> - {rejected.error.message}
                </li>
            {/each}
        </ul>
    {/if}
</div>

<div><label><input type="checkbox" bind:checked={disabled} />Disabled</label></div>

<form on:submit={(ev) => ev.preventDefault()} class="settings">
    <label
        >File Limit
        <input type="number" bind:value={fileLimit} />
    </label>
    <label
        >Max Size
        <input type="number" bind:value={maxSize} />
    </label>
    <label
        >Min Size
        <input type="number" bind:value={minSize} />
    </label>
</form>

<style>
    .container {
        width: 300px;
    }
</style>
