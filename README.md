# FileDrop

A file dropzone action & component for [Svelte](https://svelte.dev/).

## Install

```bash
npm i filedrop-svelte -D

# yarn add filedrop-svelte -dev
```

## Usage

dropfile comes with both a component and an action. The component is basically a wrapper around the action with some some default styling.

### Component

```html
<script>
	import FileDrop from "filedrop-svelte";
	import type { Files } from "filedrop-svelte";
	import fileSize from "filesize";
	let files: Files;
</script>

<FileDrop on:filedrop={(e) => { files = e.detail.files }}>
        Upload files
</FileDrop>

{#if files}
	<h3>Accepted files</h3>
	<ul>
		{#each files.accepted as file}
			<li>{file.name} - {fileSize(file.size)}</li>
		{/each}
	</ul>
	<h3>Rejected files</h3>
	<ul>
		{#each files.rejected as rejected}
			<li>{rejected.file.name} - {rejected.error.message}</li>
		{/each}
	</ul>
{/if}
```

### Action

```html
<script>
	import { filedrop } from "filedrop-svelte";
	import type { Files, FileDropOptions } from "filedrop-svelte";
	let options: FileDropOptions = {};
	let files: Files;
</script>

<div use:filedrop={options} on:filedrop={(e) => {files = e.detail.files}}>
	<!-- you can add your input[type="file"] here if you want.
	or you can omit it and it'll be appended -->
	Drag &amp; drop files
</div>
```

## Reference

### Options

| parameter       | purpose                                                                                                                                                                                                                                                   | type                | default     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `accept`        | specify file types to accept. See [HTML attribute: accept on MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.                                                                                     | `string` `string[]` | `undefined` |
| `maxSize`       | the maximum size a file can be in bytes.                                                                                                                                                                                                                  | `number`            | `undefined` |
| `minSize`       | the minimum size a file can be in bytes.                                                                                                                                                                                                                  | `number`            | `undefined` |
| `fileLimit`     | total number of files allowed in a transaction. A value of 0 disables the action/component, 1 turns multiple off, and any other value enables multiple. Any attempt to upload more files than allowed will result in the files being placed in rejections | `numer`             | `undefined` |
| `multiple`      | sets the file input to `multiple`. See [HTML attribute: multiple on MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple) for more information.                                                                            | `boolean`           | `true`      |
| `disabled`      | disables the action/component, removing all event listeners                                                                                                                                                                                               | `boolean`           | `false`     |
| `windowDrop`    | determines whether or not files can be dropped anywhere in the window. A value of `false` would require that the files be droppped within the `<FileDrop>` component or the element with `use:filedrop`.                                                  | `boolean`           | `true`      |
| `clickToUpload` | causes the containing element to be treated as the input. Disabling this does not change the `tabindex` of the container or remove the `keydown` eventListener                                                                                            | `boolean`           | `true`      |
| `input`         | allows you to explicitly pass the file `HTMLInputElement` as a parameter. If this `undefined`, the action will search for `input[type="file"]`. If one is not found, it will be appeneded to the element with `use:filedrop`                              | `HTMLInputElement`  | `undefined` |

### Errors

| class                          | reason                                                        | code                                |
| ------------------------------ | ------------------------------------------------------------- | ----------------------------------- |
| `InvalidFileTypeError`         | file type does not satisfy `accept`                           | `InvalidFileType` (**0**)           |
| `FileCountExceededError`       | total number of files selected or dropped exceeds `fileLimit` | `FileCountExceeded` (**1**)         |
| `FileSizeMinimumNotMetError`   | file does not satisify `minSize`                              | `FileSizeMinimumNotMet` (**2**)     |
| `FileSizeMaximumExceededError` | file does not satisify `maxSize`                              | `FileSizeMaximumExceeded` - (**3**) |

### Alternatives

- [svelte-file-dropzone](https://github.com/thecodejack/svelte-file-dropzone)

### Previous art

- [svelte-file-dropzone](https://github.com/thecodejack/svelte-file-dropzone)

### Dependencies

- [attr-accept](https://github.com/react-dropzone/attr-accept)
- [file-selector](https://github.com/react-dropzone/file-selector)
- [filesize](https://github.com/avoidwork/filesize.js)
- [ua-parser-js](https://github.com/faisalman/ua-parser-js)
- [playwright](https://playwright.dev/)

## Todo

- tests
- better documentation
- demo website

## License

MIT
