export const isArray = <T = unknown>(value: T | T[]): boolean =>
	Array.isArray(value);

export const toArray = <T = unknown>(value: T | T[]): T[] =>
	Array.isArray(value) ? value : [value];
