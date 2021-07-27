type EventList = import("$lib").Events;
declare namespace svelte.JSX {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type EventHandler<E = Event, T = HTMLElement> = (event: E & { target: EventTarget & T }) => any;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
	type CustomEventHandler<T, D = any> = EventHandler<CustomEvent<D>, T>;

	type HTMLAttrs<T> = {
		[key in keyof EventList as `on${key}`]?: CustomEventHandler<T, EventList[key]>;
	};
	// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
	interface HTMLAttributes<T> extends HTMLAttrs<T> {}
}
