// import { readable } from "svelte/store";
// import type { Subscriber } from "svelte/store";
// import { ExistingWindowDropError } from "$lib/errors";

// export type InstanceCountStore = ReturnType<typeof createStore>;

// export interface InstanceCount {
// 	total: number;
// 	isWindowDropActive: boolean;
// }

// function findElementWithDocumentDrop(elements: Map<HTMLElement, boolean>): HTMLElement | undefined {
// 	for (const [el, winDropIsActive] of elements) {
// 		if (winDropIsActive) {
// 			return el;
// 		}
// 	}
// 	return undefined;
// }

// function createStore() {
// 	const elements = new Map<HTMLElement, boolean>();
// 	let count: InstanceCount = { isWindowDropActive: false, total: 0 };
// 	let set: Subscriber<InstanceCount>;

// 	function updateCount() {
// 		const isWindowDropActive = findElementWithDocumentDrop(elements) !== undefined;
// 		count = { total: elements.size, isWindowDropActive };
// 		set(count);
// 	}

// 	const { subscribe } = readable(count, function (fn) {
// 		set = fn;
// 	});
// 	function removeElement(element: HTMLElement) {
// 		elements.delete(element);
// 		return updateCount();
// 	}
// 	function enableElement(element: HTMLElement, activateWindowDrop: boolean) {
// 		const exists = elements.has(element);
// 		const existingWinDropStatus = elements.get(element);

// 		if (exists && existingWinDropStatus === activateWindowDrop) {
// 			return;
// 		}
// 		const winDropEl = findElementWithDocumentDrop(elements);

// 		if (exists && activateWindowDrop && count.isWindowDropActive) {
// 			throw new ExistingWindowDropError(winDropEl, element);
// 		}
// 		if (exists) {
// 			elements.set(element, activateWindowDrop);
// 			return updateCount();
// 		}
// 		if (count.isWindowDropActive && activateWindowDrop) {
// 			elements.set(element, false);
// 			updateCount();
// 			throw new ExistingWindowDropError(winDropEl, element);
// 		}
// 		elements.set(element, activateWindowDrop);
// 		return updateCount();
// 	}

// 	return {
// 		subscribe,
// 		enableElement,
// 		removeElement,
// 	};
// }

// const store = createStore();
// export default store;

export {};
