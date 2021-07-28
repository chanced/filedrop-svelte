import type { FileDropOptions } from "$lib";
import { FileWithPath, fromEvent } from "file-selector";
import { processFiles, Files, isFileWithPath } from "./file";

export interface FileDropEventDetail {
	isFileDialogOpen: boolean;
	isDraggingFiles: boolean;
}

export interface FileDropDragEventDetail extends FileDropEventDetail {
	files: File[];
	event: DragEvent;
}
// type FileDropEventType = keyof Events;

// type FileDragEventType = Extract<
// 	FileDropEventType,
// 	| "filedragover"
// 	| "filedragenter"
// 	| "filedragleave"
// 	| "windowfiledragenter"
// 	| "windowfiledragleave"
// 	| "windowfiledragover"
// >;

// type FileDialogEventType = Extract<
// 	FileDropEventType,
// 	"filedialogopen" | "filedialogclose" | "filedialogcancel"
// >;

// export class FileDropEvent<T extends FileDropEventDetail = FileDropEventDetail> extends CustomEvent<T> {
// 	constructor(type: FileDropEventType, detail: T) {
// 		super(type, { detail });
// 	}
// }

// export class FileDropDragEvent extends FileDropEvent<FileDropDragEventDetail> {
// 	constructor(type: FileDragEventType, detail: FileDropDragEventDetail) {
// 		super(type, detail);
// 	}
// }

export interface FileDropSelectEventDetail extends FileDropEventDetail {
	files: Files;
	event: Event;
	method: "drop" | "input";
}

export interface Events {
	filedrop: FileDropSelectEventDetail;
	filedragenter: FileDropDragEventDetail;
	filedragleave: FileDropDragEventDetail;
	filedragover: FileDropDragEventDetail;
	filedialogcancel: FileDropEventDetail;
	filedialogclose: FileDropEventDetail;
	filedialogopen: FileDropEventDetail;
	windowfiledragenter: FileDropDragEventDetail;
	windowfiledragleave: FileDropDragEventDetail;
	windowfiledragover: FileDropDragEventDetail;
}

export function isDragEvent(event: Event | DragEvent): event is DragEvent {
	return "dataTransfer" in event;
}

type EventWithFiles = Event & { target: { files: File[] } };

export function doesEventTargetHaveFiles(event: Event | EventWithFiles): event is EventWithFiles {
	return "files" in event.target;
}

function isTargetHTMLElement(target: EventTarget): target is HTMLElement {
	return "tagName" in target;
}
function doesTargetHaveFiles(target: EventTarget): target is HTMLInputElement {
	return "files" in target;
}

function isEventTargetHTMLElementInput(ev: InputEvent | Event): ev is Event & { target: HTMLInputElement } {
	return isTargetHTMLElement(ev.target) && doesTargetHaveFiles(ev.target);
}

export function isEventWithFiles(ev: Event): boolean {
	if (isEventTargetHTMLElementInput(ev)) {
		return !!ev.target.files.length;
	}
	return (
		isDragEvent(ev) && ev.dataTransfer.types.some((t) => t === "Files" || t === "application/x-moz-file")
	);
}

export async function extractFilesFromEvent(ev: Event): Promise<FileWithPath[]> {
	const res = await fromEvent(ev);
	const files = res.map((f) => (isFileWithPath(f) ? f : f.getAsFile()));
	return files as FileWithPath[];
}

export async function getFilesFromEvent(ev: Event, opts: FileDropOptions): Promise<Files> {
	const files = await extractFilesFromEvent(ev);
	return processFiles(files, opts);
}

export function isNode(target: EventTarget | Node): target is Node {
	return "childNodes" in target;
}
