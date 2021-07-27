import { FileWithPath, fromEvent } from "file-selector";
import { processFiles, Files, isFileWithPath } from "./file";
export interface Events {
	fileselect: FileSelectEvent;
	dialogcancel: undefined;
	dialogclose: undefined;
	dialogopen: undefined;
}

export interface FileDropOptions {
	accept?: string | string[];
	maxSize?: number;
	minSize?: number;
	fileLimit?: number;
	multiple?: boolean;
	disabled?: boolean;
	input?: HTMLInputElement;
	documentDrop?: boolean;
}

export interface FileSelectEvent {
	files: Files;
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

async function extractFilesFromEvent(ev: Event): Promise<FileWithPath[]> {
	const res = await fromEvent(ev);
	const files = res.map((f) => (isFileWithPath(f) ? f : f.getAsFile()));
	return files as FileWithPath[];
}

export async function getFilesFromEvent(ev: Event, opts: FileDropOptions): Promise<Files> {
	const files = await extractFilesFromEvent(ev);
	return processFiles(files, opts);
}
