import fileSize from "filesize";

export enum ErrorCode {
    InvalidFileType,
    FileSizeMaximumExceeded,
    FileSizeMinimumNotMet,
    FileCountExceeded,
}

export const errorCodeNames = {
    [ErrorCode.InvalidFileType]: "invalid file type",
    [ErrorCode.FileCountExceeded]: "file count exceeded",
    [ErrorCode.FileSizeMinimumNotMet]: "min file size not met",
    [ErrorCode.FileSizeMaximumExceeded]: "max file size exceeded",
};

import type { FileWithPath } from "file-selector";

export class FileDropError extends Error {
    code: ErrorCode;
    message: string;
    file: FileWithPath;
    constructor(code: ErrorCode, file: FileWithPath, message: string) {
        super(message);
        this.code = code;
        this.message = message;
        this.file = file;
        this.name = errorCodeNames[code];
    }
}
export class InvalidFileTypeError extends FileDropError {
    allowed: string[];
    constructor(file: FileWithPath, allowed: string | string[], message?: string) {
        if (!message) {
            message = `${file.name} is not an accepted file type (${file.type}`;
        }
        super(ErrorCode.InvalidFileType, file, message);
        if (typeof allowed === "string") {
            allowed = allowed.split(",");
        }
        this.allowed = allowed;
    }
}
export class FileSizeMinimumNotMetError extends FileDropError {
    minimum: number;
    readableMinimum: string;
    readableSize: string;
    constructor(file: FileWithPath, minimum: number, message?: string) {
        const readableSize = fileSize(file.size);
        const readableMinimum = fileSize(minimum);
        message =
            message ??
            `$file size ${readableSize} does not meet the file size minimum of ${readableMinimum}.`;
        super(ErrorCode.FileSizeMinimumNotMet, file, message);

        this.minimum = minimum;
        this.readableMinimum = readableMinimum;
        this.readableSize = readableSize;
    }
}
export class FileSizeLimitExceededError extends FileDropError {
    limit: number;
    readableLimit: string;
    readableSize: string;
    constructor(file: File, limit: number, message?: string) {
        const readableSize = fileSize(file.size);
        const readableLimit = fileSize(limit);
        message = message ?? `file size ${readableSize} exceeds file size limit of ${readableLimit}.`;

        super(ErrorCode.FileSizeMinimumNotMet, file, message);
        this.readableLimit = readableLimit;
        this.readableSize = readableSize;
    }
}
export class FileCountExceededError extends FileDropError {
    limit: number;
    constructor(file: FileWithPath, limit: number, message?: string) {
        message = message ?? `file count limit of ${limit} exceeded`;
        super(ErrorCode.FileCountExceeded, file, message);
        this.limit = limit;
    }
}
