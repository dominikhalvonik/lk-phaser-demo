export const timeLeft = (
	timestamp: number,
	inSeconds: boolean = false,
): number => Math.trunc((timestamp - Date.now()) / (inSeconds ? 1e3 : 1));
