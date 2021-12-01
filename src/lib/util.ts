import type { FileWithPath } from "file-selector";

export function isDataTransferItem(f: FileWithPath | DataTransferItem): f is DataTransferItem {
    return f && "getAsFile" in f;
}

export function isArrayOfStrings(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((v) => typeof v === "string");
}

export function isString(value: unknown): value is string {
    return typeof value === "string";
}
export function isBrowser(): boolean {
    return typeof window !== "undefined";
}
