import type { Events, FileDropOptions } from "..";
import { getFilesFromEvent, extractFilesFromEvent, isEventWithFiles, isNode } from "../event";
import { isBrowser } from "../util";

type Action = {
    destroy(): void;
    update(options?: FileDropOptions);
};

function getMultiple(opts: FileDropOptions): boolean {
    if (opts.fileLimit && opts.fileLimit > 1) {
        return true;
    }
    if (opts.fileLimit !== undefined && opts.fileLimit === 1) {
        return false;
    }
    if (opts.multiple !== undefined) {
        return opts.multiple;
    }
    return true;
}

function getTabIndex(node: HTMLElement, options: FileDropOptions): number {
    if (options.disabled) {
        return -1;
    }
    if (node.tabIndex > -1) {
        return node.tabIndex;
    }
    if (options.tabIndex !== undefined) {
        return options.tabIndex;
    }
    if (options.input.tabIndex > -1) {
        return options.input.tabIndex;
    }
    return options.hideInput ? 0 : -1;
}

function defaultToTrue(value: boolean | undefined): boolean {
    return value || value === undefined;
}

function getDisabled(options: FileDropOptions): boolean {
    if (options.fileLimit === 0) {
        return true;
    }
    if (options.disabled !== undefined) {
        return options.disabled;
    }
    return false;
}
function getAccept(options: FileDropOptions): string | string[] | undefined {
    if (options.accept !== undefined && options.accept.length) {
        if (Array.isArray(options.accept)) {
            return [...options.accept];
        } else {
            return options.accept;
        }
    }
    if (options.input?.accept.length) {
        return options.input?.accept;
    }
    return undefined;
}
function configOptions(node: HTMLElement, opts: FileDropOptions): FileDropOptions {
    const options: FileDropOptions = opts ? { ...opts } : {};
    options.disabled = getDisabled(options);
    options.id = getId(node, options);
    options.hideInput = defaultToTrue(options.hideInput);
    options.input = getInputElement(node, options);
    options.multiple = getMultiple(options);
    options.hideInput = defaultToTrue(options.hideInput);
    options.windowDrop = isBrowser() && defaultToTrue(options.windowDrop);
    options.tabIndex = getTabIndex(node, options);
    options.clickToUpload = defaultToTrue(options.clickToUpload);
    options.accept = getAccept(options);
    return options;
}
function getId(node: HTMLElement, opts: FileDropOptions): string | undefined {
    if (opts.id?.length) {
        return opts.id;
    }
    return node.id.length ? node.id : undefined;
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
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.style.display = "none";
        input.tabIndex = -1;
        return node.appendChild(input);
    }
    if (inputs.length > 1) {
        throw new Error(
            "FileDrop: container node may only contain a single file input unless input is specified in the options",
        );
    }
    return inputs.item(0) as HTMLInputElement;
}

export const filedrop = function (node: HTMLElement, opts?: FileDropOptions): Action {
    function dispatch<K extends keyof Events, T extends Events[K] = Events[K]>(typ: K, detail: T): void {
        node.dispatchEvent(
            new CustomEvent<T>(typ, { detail }),
        );
    }

    let input: HTMLInputElement;
    let options: FileDropOptions;
    let isFileDialogOpen = false;
    let isDraggingFiles = false;
    let triggerEvent: Event;

    init(opts);

    async function handleChange(ev: Event) {
        ev.preventDefault();
        const files = await getFilesFromEvent(ev, options);
        dispatch("filedrop", {
            method: "input",
            files,
            isFileDialogOpen,
            isDraggingFiles,
            event: triggerEvent,
            id: options.id,
            options,
        });
    }

    async function handleDrop(ev: DragEvent) {
        isDraggingFiles = isEventWithFiles(ev);
        if (!isDraggingFiles) {
            return;
        }
        ev.preventDefault();
        triggerEvent = ev;
        const files = await getFilesFromEvent(ev, options);
        dispatch("filedrop", {
            method: "drop",
            files,
            options,
            id: options.id,
            isFileDialogOpen,
            isDraggingFiles,
            event: triggerEvent,
        });
    }

    function openDialog() {
        setTimeout(() => {
            input.click();
        }, 0);
    }

    function handleKeyDown(ev: KeyboardEvent) {
        triggerEvent = ev;
        if (ev.key === " " || ev.key === "Enter") {
            ev.preventDefault();
            openDialog();
        }
    }

    function handleInputClick() {
        isFileDialogOpen = true;
        dispatch("filedialogopen", {
            isDraggingFiles,
            isFileDialogOpen,
            id: options.id,
            options,
        });
    }

    function handleClick(ev: Event) {
        if (isNode(ev.target) && input.isEqualNode(ev.target)) {
            return;
        }
        ev.preventDefault();
        triggerEvent = ev;
        openDialog();
    }
    function handleDocumentDragEnter(ev: DragEvent) {
        isDraggingFiles = isEventWithFiles(ev);
    }
    async function handleDocumentDragLeave(ev: DragEvent) {
        isDraggingFiles = isEventWithFiles(ev);
        if (!isDraggingFiles) {
            return;
        }
        isDraggingFiles = false;
        const files = await extractFilesFromEvent(ev);
        dispatch("windowfiledragleave", {
            event: ev,
            files,
            isDraggingFiles,
            isFileDialogOpen,
            id: options.id,
            options,
        });
    }

    async function handleDocumentDragOver(ev: DragEvent) {
        ev.preventDefault();
        isDraggingFiles = isEventWithFiles(ev);
        if (!isDraggingFiles) {
            return;
        }
        const files = await extractFilesFromEvent(ev);
        dispatch("windowfiledragover", {
            event: ev,
            files,
            isDraggingFiles,
            isFileDialogOpen,
            id: options.id,
            options,
        });
    }

    async function handleDragEnter(ev: DragEvent) {
        isDraggingFiles = isEventWithFiles(ev);
        if (!isDraggingFiles) {
            return;
        }
        isDraggingFiles = true;
        const files = await extractFilesFromEvent(ev);
        dispatch("filedragenter", {
            files,
            event: ev,
            isDraggingFiles,
            isFileDialogOpen,
            id: options.id,
            options,
        });
    }

    async function handleDragLeave(ev: DragEvent) {
        isDraggingFiles = isEventWithFiles(ev);
        if (!isDraggingFiles) {
            return;
        }
        const files = await extractFilesFromEvent(ev);
        dispatch("filedragleave", {
            event: ev,
            files,
            isDraggingFiles,
            isFileDialogOpen,
            id: options.id,
            options,
        });
    }
    async function handleDragOver(ev: DragEvent) {
        isDraggingFiles = isEventWithFiles(ev);
        if (!isDraggingFiles) {
            return;
        }
        const files = await extractFilesFromEvent(ev);
        dispatch("filedragover", {
            event: ev,
            files,
            isDraggingFiles,
            isFileDialogOpen,
            id: options.id,
            options,
        });
    }

    async function handleDocumentDrop(ev: DragEvent) {
        ev.preventDefault();
        isDraggingFiles = isEventWithFiles(ev);
        if (!isDraggingFiles) {
            return;
        }
        if (isNode(ev.target) && (node.isEqualNode(ev.target) || node.contains(ev.target))) {
            // let it bubble
            return;
        }
        if (!options.windowDrop) {
            return;
        }
        const files = await getFilesFromEvent(ev, options);
        dispatch("filedrop", {
            method: "drop",
            event: ev,
            files,
            isDraggingFiles,
            isFileDialogOpen,
            id: options.id,
            options,
        });
    }

    function handleWindowFocus() {
        if (input && isFileDialogOpen) {
            isFileDialogOpen = false;
            const tick = (t: number) => {
                return () => {
                    if (!input?.files.length && t < 21) {
                        setTimeout(tick(t + 1), 35);
                        return;
                    }
                    if (!input.files.length) {
                        dispatch("filedialogcancel", {
                            isDraggingFiles,
                            isFileDialogOpen,
                            id: options.id,
                            options,
                        });
                        return;
                    }
                    dispatch("filedialogclose", {
                        isDraggingFiles,
                        isFileDialogOpen,
                        id: options.id,
                        options,
                    });
                };
            };
            setTimeout(tick(0), 35);
        }
    }

    function init(opts: FileDropOptions) {
        options = configOptions(node, opts);
        input = options.input;
        node.tabIndex = options.tabIndex;

        if (!options.disabled) {
            node.classList.remove("disabled");
            input.multiple = options.multiple;
            if (options.accept?.length) {
                if (Array.isArray(options.accept)) {
                    input.accept = options.accept.join(",");
                } else {
                    input.accept = options.accept;
                }
            } else {
                input.removeAttribute("accept");
            }

            input.autocomplete = "off";
            if (options.hideInput) {
                input.style.display = "none";
            }

            if (isBrowser) {
                node.addEventListener("dragenter", handleDragEnter);
                node.addEventListener("dragleave", handleDragLeave);
                node.addEventListener("dragover", handleDragOver);
                node.addEventListener("drop", handleDrop);

                input.addEventListener("change", handleChange);
                input.addEventListener("click", handleInputClick);

                if (options.clickToUpload) {
                    node.addEventListener("click", handleClick);
                } else {
                    node.removeEventListener("click", handleClick);
                }

                if (options.hideInput) {
                    node.addEventListener("keydown", handleKeyDown);
                }

                if (!options.hideInput && !options.clickToUpload) {
                    node.removeEventListener("keydown", handleKeyDown);
                }

                window.addEventListener("focus", handleWindowFocus);
                document.addEventListener("dragenter", handleDocumentDragEnter);
                document.addEventListener("dragleave", handleDocumentDragLeave);
                document.addEventListener("dragover", handleDocumentDragOver);
                document.addEventListener("drop", handleDocumentDrop);
            }
        } else {
            node.classList.add("disabled");
            teardown();
        }
    }
    function teardown() {
        node.removeEventListener("keydown", handleKeyDown);
        node.removeEventListener("dragenter", handleDragEnter);
        node.removeEventListener("dragleave", handleDragLeave);
        node.removeEventListener("dragover", handleDragOver);
        node.removeEventListener("drop", handleDrop);
        node.removeEventListener("click", handleClick);

        input.removeEventListener("change", handleChange);
        input.removeEventListener("click", handleInputClick);

        input.files = null;
        if (isBrowser) {
            document.removeEventListener("dragover", handleDocumentDragOver);
            document.removeEventListener("dragenter", handleDocumentDragEnter);
            document.removeEventListener("dragleave", handleDocumentDragLeave);
            document.removeEventListener("drop", handleDocumentDrop);
            window.removeEventListener("focus", handleWindowFocus);
        }
    }

    return {
        update(opts?: FileDropOptions) {
            init(opts || {});
        },
        destroy() {
            teardown();
        },
    };
};

function isFileInput(node: HTMLElement): node is HTMLInputElement {
    return node.tagName === "INPUT" && node.getAttribute("type")?.toLowerCase() === "file";
}

export default filedrop;
