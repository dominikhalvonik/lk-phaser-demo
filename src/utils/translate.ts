import translations from "@/data/translations_sk";

export const translate = (key: string): string => {
	if (key in translations) return translations[key];
	if (import.meta.env.DEV) {
		// eslint-disable-next-line no-console
		console.warn(
			"%c TEXTS ",
			"background-color:gold;color:black;font-weight:700;",
			`Translation for key ${key} not found!`,
		);
		return `#${key}#`;
	}
	return "";
};
