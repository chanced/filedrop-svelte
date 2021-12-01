# FileDrop

A file dropzone action & component for [Svelte](https://svelte.dev/).

## Install

```bash
npm i filedrop-svelte -D

# yarn add filedrop-svelte -dev
```

## Usage

filedrop-svelte comes with both a component and an action. The component is basically a wrapper around the action with some some default styling.

### Component

See [this REPL for minmimal usage](https://svelte.dev/repl/511ad04931514bcf98f7408edb08d075?version=3.41.0).

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

See this [REPL for minimal usage](https://svelte.dev/repl/645841f327b8484093f94b84de8a7e64?version=3.41.0).

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
| `clickToUpload` | causes the containing element to be treated as the input. If hideInput is true or undefined, disabling this does not change the `tabindex` of the container or remove the `keydown` eventListener                                                         | `boolean`           | `true`      |
| `tabIndex`      | tab index of the container. if `disabled` is `true` then this is set to `-1`. If `clickToUpload` is `true` or `undefined`, this defaults to 0.                                                                                                            | `number`            | `0`         |
| `hideInput`     | if true or undefined, input[type='file'] will be set to display:none                                                                                                                                                                                      | `boolean`           | `true`      |
| `input`         | allows you to explicitly pass a reference to the file `HTMLInputElement` as a parameter. If `undefined`, the action will search for `input[type="file"]`. If one is not found, it will be appeneded to the element with `use:filedrop`                    | `HTMLInputElement`  | `undefined` |

### Events

| event                 | description                                                                                                              | `event.detail`        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `filedrop`            | one or more files has been selected in the file dialog or drag-and-dropped                                               | `FileDropSelectEvent` |
| `filedragenter`       | a dragenter event has occurred on the container element containnig one or more files                                     | `FileDropDragEvent`   |
| `filedragleave`       | a dragleave event has occurred on the container element containing one or more files                                     | `FileDropDragEvent`   |
| `filedragover`        | a dragover event has occurred on the container element containing one or more files                                      | `FileDropDragEvent`   |
| `filedialogcancel`    | the file dialog has been canceled without selecting files                                                                | `FileDropEvent`       |
| `filedialogclose`     | the file dialog has been closed with files selected                                                                      | `FileDropEvent`       |
| `filedialogopen`      | the file dialog has been opened                                                                                          | `FileDropEvent`       |
| `windowfiledragenter` | a dragenter event has occurred on the document (event is named windowfiledragenter so not to confuse document with file) | `FileDropDragEvent`   |
| `windowfiledragleave` | a dragleave event has occurred on the document (event is named windowfiledragleave so not to confuse document with file) | `FileDropDragEvent`   |
| `windowfiledragover`  | a dragover event has occurred on the document (event is named windowfiledragover so not to confuse document with file)   | `FileDropDragEvent`   |

### Errors

| class                          | reason                                                        | code                              |
| ------------------------------ | ------------------------------------------------------------- | --------------------------------- |
| `InvalidFileTypeError`         | file type does not satisfy `accept`                           | `InvalidFileType` (**0**)         |
| `FileCountExceededError`       | total number of files selected or dropped exceeds `fileLimit` | `FileCountExceeded` (**1**)       |
| `FileSizeMinimumNotMetError`   | file does not satisify `minSize`                              | `FileSizeMinimumNotMet` (**2**)   |
| `FileSizeMaximumExceededError` | file does not satisify `maxSize`                              | `FileSizeMaximumExceeded` (**3**) |

### Typescript

In order for typings to work properly, you'll need to add the following to
`global.d.ts` [until this issue is
resolved](https://github.com/sveltejs/language-tools/issues/431):

```typescript
declare type FileDropEvent = import("./lib/event").FileDropEvent;
declare type FileDropSelectEvent = import("./lib/event").FileDropSelectEvent;
declare type FileDropDragEvent = import("./lib/event").FileDropDragEvent;
declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        onfiledrop?: (event: CustomEvent<FileDropSelectEvent> & { target: EventTarget & T }) => void;
        ononfiledrop?: (event: CustomEvent<FileDropSelectEvent> & { target: EventTarget & T }) => void;
        ononfiledragenter?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
        ononfiledragleave?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
        ononfiledragover?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
        ononfiledialogcancel?: (event: CustomEvent<FileDropEvent> & { target: EventTarget & T }) => void;
        ononfiledialogclose?: (event: CustomEvent<FileDropEvent> & { target: EventTarget & T }) => void;
        ononfiledialogopen?: (event: CustomEvent<FileDropEvent> & { target: EventTarget & T }) => void;
        ononwindowfiledragenter?: (
            event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T },
        ) => void;
        ononwindowfiledragleave?: (
            event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T },
        ) => void;
        ononwindowfiledragover?: (
            event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T },
        ) => void;
    }
}
```

You may need to edit `tsconfig.json` to include `global.d.ts` if it isn't already.


### Alternatives

-   [svelte-file-dropzone](https://github.com/thecodejack/svelte-file-dropzone)

### Previous art

-   [react-dropzone](https://github.com/react-dropzone/react-dropzone)
-   [svelte-file-dropzone](https://github.com/thecodejack/svelte-file-dropzone)

### Dependencies

-   [file-selector](https://github.com/react-dropzone/file-selector)


## Todo

-   tests
-   better documentation
-   demo website

## License

MIT
