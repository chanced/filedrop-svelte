import type { FileDropOptions } from "./event";
import doesAccept from "attr-accept";
import {
	FileCountExceededError,
	FileDropError,
	FileSizeLimitExceededError,
	FileSizeMinimumNotMetError,
	InvalidFileTypeError,
} from "./errors";
import type { FileWithPath } from "file-selector";

export interface Files {
	accepted: FileWithPath[];
	errors: FileDropError[];
}

type CheckParams = {
	accept?: string | string[];
	maxSize?: number | undefined | null;
	minSize?: number | undefined | null;
};

export function processFiles(files: FileWithPath[], options: FileDropOptions): Files {
	let { fileLimit } = options;
	if (options.multiple) {
		fileLimit = 1;
	}
	let count = 0;
	return files.reduce(
		(accumulator, file) => {
			let error = checkFile(file, options);
			console.log("error", error);
			if (error != undefined) {
				accumulator.errors.push(error);
			} else if (fileLimit > 0 && count > fileLimit) {
				error = new FileCountExceededError(file, fileLimit);
			}
			if (error != undefined) {
				accumulator.errors.push(error);
			} else {
				accumulator.accepted.push(file);
				count = count + 1;
			}
			return accumulator;
		},
		{ accepted: [], errors: [] } as Files,
	);
}

export function checkFile(file: File, params: CheckParams): FileDropError | undefined {
	const { accept, minSize: min, maxSize: max } = params;
	return checkFileType(file, accept) || checkFileSize(file, { min, max });
}

export function checkFileType(
	file: File,
	accept: string | string[] | undefined,
): InvalidFileTypeError | undefined {
	// Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
	// that MIME type will always be accepted
	if (accept != undefined) {
		if (typeof accept === "string") {
			accept = accept.split(",");
		}
		accept.push("application/x-moz-file");
		if (!doesAccept(file, accept)) {
			return new InvalidFileTypeError(file, accept);
		}
	}
	return undefined;
}

export function checkMinFileSize(file: File, min?: number | null): FileSizeMinimumNotMetError | undefined {
	if (min && file.size < min) {
		return new FileSizeMinimumNotMetError(file, min);
	}
}

export function checkMaxFileSize(file: File, max?: number | null): FileSizeLimitExceededError | undefined {
	if (max && file.size > max) {
		return new FileSizeLimitExceededError(file, max);
	}
}

type FileSizeLimits = {
	min?: number | null | undefined;
	max?: number | null | undefined;
};
export function checkFileSize(file: File, { min, max }: FileSizeLimits): FileDropError | undefined {
	return checkMaxFileSize(file, max) || checkMinFileSize(file, min);
}

export function isFileWithPath(f: FileWithPath | DataTransferItem): f is FileWithPath {
	return "arrayBuffer" in f && "size" in f;
}
