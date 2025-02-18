const CAPITALIZE_REGEXP = /^\w/;

export const capitalize = (value: string): string =>
	value.length
		? value.replace(CAPITALIZE_REGEXP, (character: string): string =>
				character.toUpperCase(),
			)
		: "";
