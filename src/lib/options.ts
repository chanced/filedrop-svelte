export interface FileDropOptions {
	// specify file types to accept. See [HTML attribute: accept on MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.
	accept?: string | string[];
	// the maximum size a file can be in bytes.
	maxSize?: number;
	// the minimum size a file can be in bytes.
	minSize?: number;
	// total number of files allowed in a transaction. A value of 0 disables the action/component, 1 turns multiple off, and any other value enables multiple. Any attempt to upload more files than allowed will result in the files being placed in rejections
	fileLimit?: number;
	// sets the file input to `multiple`. See [HTML attribute: multiple on MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple) for more information.
	multiple?: boolean;
	// disables the action/component, removing all event listeners
	disabled?: boolean;
	// determines whether or not files can be dropped anywhere in the window. A value of `false` would require that the files be droppped within the `<FileDrop>` component or the element with `use:filedrop`.
	windowDrop?: boolean;
	// causes the containing element to be treated as the input. Disabling this does not change the `tabindex` of the container or remove the `keydown` eventListener
	clickToUpload?: boolean;
	// style applied to the node
	style?: string;
	// id of the node
	id?: string;
	// allows you to explicitly pass the file `HTMLInputElement` as a parameter. If this `undefined`, the action will search for `input[type="file"]`. If one is not found, it will be appeneded to the element with `use:filedrop`
	input?: HTMLInputElement;
}
