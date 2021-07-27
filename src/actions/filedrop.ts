import { browser } from "$app/env";
import { Events, FileDropOptions, getFilesFromEvent } from "$lib";
type Action = {
	destroy(): void;
	update(options?: FileDropOptions);
};

export const filedrop = function (node: HTMLElement, options?: FileDropOptions): Action {
	function dispatch<K extends keyof Events, T extends Events[K]>(typeArg: K, detail?: T) {
		node.dispatchEvent(new CustomEvent(typeArg, { detail }));
	}
	options = options || {};
	let isFileDialogActive = false;

	const input = getInputElement(node, options);
	node.tabIndex = getTabIndex(node, input);
	input.style.display = "none";
	input.tabIndex = -1;

	async function handleChange(ev: Event) {
		ev.preventDefault();
		const files = await getFilesFromEvent(ev, options);
		dispatch("fileselect", { files });
	}

	function handleInputClick(ev: Event) {
		ev.stopPropagation();
		dispatch("dialogclose");
	}
	function handleClick(ev: Event) {
		input.click();
	}
	function init(options: FileDropOptions) {
		if (!options.disabled) {
			input.addEventListener("change", handleChange);
			input.addEventListener("click", handleInputClick);
			node.addEventListener("click", handleClick);
			node.classList.remove("disalbed");
			if (browser) {
				window.addEventListener("focus", handleWindowFocus);
			}
		} else {
			node.classList.add("disabled");
			teardown();
		}
	}
	function teardown() {
		input.removeEventListener("change", handleChange);
		node.removeEventListener("click", handleClick);

		if (browser) {
			window.removeEventListener("focus", handleWindowFocus);
		}
	}
	function disable(): void {
		if (!options.disabled) {
			options.disabled = true;
			teardown();
		}
	}

	function handleWindowFocus() {
		if (input && isFileDialogActive) {
			isFileDialogActive = false;
			const tick = (t: number) => {
				return () => {
					if (!input?.files.length && t < 21) {
						setTimeout(tick(t + 1), 35);
					} else if (!input.files.length) {
						dispatch("dialogcancel");
					} else {
						dispatch("dialogclose");
					}
				};
			};
			setTimeout(tick(0), 35);
		}
	}

	init(options || {});

	return {
		update(options?: FileDropOptions) {
			init(options || {});
		},
		destroy() {
			teardown();
		},
	};
};

function isFileInput(node: HTMLElement): node is HTMLInputElement {
	return node.tagName === "INPUT" && node.getAttribute("type")?.toLowerCase() === "file";
}

function getInputElement(node: HTMLElement, { input }: FileDropOptions): HTMLInputElement {
	if (input != undefined) {
		if (isFileInput(input)) {
			return input;
		}
		throw new Error("input must be an HTMLInputElement with type file");
	}
	if (node.tagName === "INPUT") {
		throw new Error("FileDrop: action must be used on a containing element, not the input.");
	}
	const inputs = node.querySelectorAll("input[type='file']");
	if (!inputs.length) {
		throw new Error("FileDrop: container node must contain a file input");
	}
	if (inputs.length > 1) {
		throw new Error(
			"FileDrop: container node may only contain a single file input unless input is specified in the options",
		);
	}
	return inputs.item(0) as HTMLInputElement;
}

export function getTabIndex(node: HTMLElement, input: HTMLInputElement): number {
	if (node.tabIndex > -1) {
		return node.tabIndex;
	}
	if (input.tabIndex > -1) {
		return input.tabIndex;
	}
	return 0;
}

export default filedrop;
