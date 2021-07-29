// import UAParser from "ua-parser-js";
// import type { IResult } from "ua-parser-js";

// type cache = Record<string, boolean>;

// export class UserAgent implements IResult {
// 	ua: string;
// 	browser: UAParser.IBrowser;
// 	device: UAParser.IDevice;
// 	engine: UAParser.IEngine;
// 	os: UAParser.IOS;
// 	cpu: UAParser.ICPU;
// 	private _cache: cache;
// 	constructor(result: IResult) {
// 		this.ua = result.ua;
// 		this.device = result.device;
// 		this.engine = result.engine;
// 		this.os = result.os;
// 		this.cpu = result.cpu;
// 		this.browser = result.browser;
// 		this._cache = {};
// 	}
// 	isClient(): boolean {
// 		if (this._cache.isServer !== undefined) {
// 			return this._cache.isServer;
// 		}
// 		return (this._cache.isServer = this.ua === "");
// 	}
// 	isServer(): boolean {
// 		if (this._cache.isServer !== undefined) {
// 			return this._cache.isServer;
// 		}
// 		return (this._cache.isServer = this.ua === "");
// 	}
// 	isSmartTV(): boolean {
// 		if (this._cache.isSmartTV !== undefined) {
// 			return this._cache.isSmartTV;
// 		}
// 		return (this._cache.isSmartTV = this.device.type?.toLowerCase() === "smarttv");
// 	}
// 	isConsole(): boolean {
// 		if (this._cache.isConsole !== undefined) {
// 			return this._cache.isConsole;
// 		}
// 		return (this._cache.isConsole = this.device.type?.toLowerCase() === "console");
// 	}
// 	isWearable(): boolean {
// 		if (this._cache.isWearable !== undefined) {
// 			return this._cache.isWearable;
// 		}
// 		return (this._cache.isWearable = this.device.type?.toLowerCase() === "wearable");
// 	}
// 	isMobileSafari(): boolean {
// 		if (this._cache.isMobileSafari !== undefined) {
// 			return this._cache.isMobileSafari;
// 		}
// 		return (this._cache.isMobileSafari = this.browser.name?.toLowerCase() === "mobile safari");
// 	}
// 	isChromium(): boolean {
// 		if (this._cache.isChromium !== undefined) {
// 			return this._cache.isChromium;
// 		}
// 		return (this._cache.isChromium = this.browser.name?.toLowerCase().includes("chromium"));
// 	}
// 	isMobile(): boolean {
// 		if (this._cache.isMobile !== undefined) {
// 			return this._cache.isMobile;
// 		}
// 		return (this._cache.isMobile = this.device.type?.toLowerCase() === "mobile");
// 	}

// 	isTablet(): boolean {
// 		if (this._cache.isTablet !== undefined) {
// 			return this._cache.isTablet;
// 		}
// 		return (this._cache.isTablet = this.device.type?.toLowerCase() === "tablet");
// 	}
// 	isBrowser(): boolean {
// 		if (this._cache.isBrowser !== undefined) {
// 			return this._cache.isBrowser;
// 		}
// 		return (this._cache.isBrowser =
// 			!this.isServer && this.browser.name !== "" && this.device.type === undefined);
// 	}
// 	isAndroid(): boolean {
// 		if (this._cache.isAndroid !== undefined) {
// 			return this._cache.isAndroid;
// 		}
// 		return (this._cache.isAndroid = this.os.name?.toLowerCase() === "android");
// 	}
// 	isWinPhone(): boolean {
// 		if (this._cache.isWinPhone !== undefined) {
// 			return this._cache.isWinPhone;
// 		}
// 		return (this._cache.isWinPhone = this.os.name?.toLowerCase() === "Windows Phone");
// 	}
// 	isIOS(): boolean {
// 		if (this._cache.isIOS !== undefined) {
// 			return this._cache.isIOS;
// 		}
// 		return (this._cache.isIOS = this.os.name?.toLowerCase() === "ios");
// 	}
// 	isEdge(): boolean {
// 		if (this._cache.isEdge !== undefined) {
// 			return this._cache.isEdge;
// 		}
// 		return (this._cache.isEdge = this.browser.name?.toLowerCase() === "edge");
// 	}
// 	isChrome(): boolean {
// 		if (this._cache.isChrome !== undefined) {
// 			return this._cache.isChrome;
// 		}
// 		return (this._cache.isChrome = this.browser.name?.toLowerCase() === "chrome");
// 	}
// 	isIE(): boolean {
// 		if (this._cache.isIE !== undefined) {
// 			return this._cache.isIE;
// 		}
// 		const browserName = this.browser.name?.toLowerCase();
// 		return (this._cache.isIE = browserName === "ie" || browserName === "internet explorer");
// 	}
// 	isSafari(): boolean {
// 		if (this._cache.isSafari !== undefined) {
// 			return this._cache.isSafari;
// 		}
// 		return (this._cache.isSafari = this.browser.name?.toLowerCase().includes("safari"));
// 	}
// 	isFirefox(): boolean {
// 		if (this._cache.isFirefox !== undefined) {
// 			return this._cache.isFirefox;
// 		}
// 		return (this._cache.isFirefox = this.browser.name?.toLowerCase() === "firefox");
// 	}
// 	isOpera(): boolean {
// 		if (this._cache.isOpera !== undefined) {
// 			return this._cache.isOpera;
// 		}
// 		return (this._cache.isOpera = this.browser.name?.toLowerCase() === "opera");
// 	}
// 	isLegacyEdge(): boolean {
// 		if (this._cache.isLegacyEdge !== undefined) {
// 			return this._cache.isLegacyEdge;
// 		}
// 		return (this._cache.isLegacyEdge = !this.isChromium() && this.isEdge());
// 	}
// 	isYandex(): boolean {
// 		if (this._cache.isYandex !== undefined) {
// 			return this._cache.isYandex;
// 		}
// 		return (this._cache.isYandex = this.browser.name?.toLowerCase() === "yandex");
// 	}
// 	isMacOs(): boolean {
// 		if (this._cache.isMacOs !== undefined) {
// 			return this._cache.isMacOs;
// 		}
// 		return (this._cache.isMacOs = this.os.name?.toLowerCase() === "mac os");
// 	}
// 	isWindows(): boolean {
// 		if (this._cache.isWindows !== undefined) {
// 			return this._cache.isWindows;
// 		}
// 		return (this._cache.isWindows = this.os.name?.toLowerCase() === "windows");
// 	}
// 	isSamsungBrowser(): boolean {
// 		if (this._cache.isSamsungBrowser !== undefined) {
// 			return this._cache.isSamsungBrowser;
// 		}
// 		return (this._cache.isOpera = this.browser.name?.toLowerCase() === "samsung browser");
// 	}
// }

// export function parse(useragent?: string): UserAgent {
// 	if (!useragent) {
// 		useragent = typeof window === "undefined" ? "" : window.navigator.userAgent;
// 	}
// 	const parser = new UAParser(useragent);
// 	return new UserAgent(parser.getResult());
// }

// export const userAgent = parse();

// export default userAgent;
export {};
