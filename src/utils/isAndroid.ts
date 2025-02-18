const ANDROID_REGEXP = /android/i;

export const isAndroid = (): boolean =>
	ANDROID_REGEXP.test(navigator.userAgent);
