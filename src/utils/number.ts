export const random = (min: number = 0, max: number = 1): number =>
	Math.random() * (max - min) + min;
