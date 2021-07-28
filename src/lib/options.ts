export interface FileDropOptions {
	accept?: string | string[];
	maxSize?: number;
	minSize?: number;
	fileLimit?: number;
	multiple?: boolean;
	disabled?: boolean;
	input?: HTMLInputElement;
	windowDrop?: boolean;
	clickToUpload?: boolean;
	style?: string;
	id?: string;
}
