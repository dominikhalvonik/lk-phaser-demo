export const isSafari = (): boolean =>
	navigator.userAgent.includes("Safari") &&
	!navigator.userAgent.includes("Chrome");
