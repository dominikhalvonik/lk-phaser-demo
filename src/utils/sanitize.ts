const HTML_ENTITIES_TO_SANITIZE = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	// prettier-ignore
	"\"": "&quot;",
	"'": "&#39;",
	"`": "&#x60;",
	"=": "&#x3D;",
	"/": "&#x2F;",
};

const HTML_ENTITIES_TO_SANITIZE_REGEXP = new RegExp(
	`[${Object.keys(HTML_ENTITIES_TO_SANITIZE).join("")}]`,
	"g",
);

export const sanitizeHtml = (string: string): string =>
	string.replace(
		HTML_ENTITIES_TO_SANITIZE_REGEXP,
		(match: string): string =>
			HTML_ENTITIES_TO_SANITIZE[
				match as keyof typeof HTML_ENTITIES_TO_SANITIZE
			],
	);
