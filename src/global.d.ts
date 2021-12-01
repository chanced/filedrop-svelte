/// <reference types="@sveltejs/kit" />
declare type FileDropEvent = import("./lib/event").FileDropEvent;
declare type FileDropSelectEvent = import("./lib/event").FileDropSelectEvent;
declare type FileDropDragEvent = import("./lib/event").FileDropDragEvent;
declare namespace svelte.JSX {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
