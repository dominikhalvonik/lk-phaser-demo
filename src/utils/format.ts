import { BCP47_SK } from "../config/constants";

export const formatDuration = (
	days: number,
	hours: number,
	minutes: number,
	seconds: number,
): string => {
	// TODO: Toto netreba prekladat ?
	if (days > 0) return `${days}d ${hours.toString().padStart(2, "0")}h`;
	if (hours > 0) return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
	if (minutes >= 1)
		return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
	return `${seconds}s`;
};

export const formatNumber = (value: number): string =>
	new Intl.NumberFormat(BCP47_SK).format(value);

export const formatPercent = (value: number): string =>
	new Intl.NumberFormat(BCP47_SK, {
		style: "percent",
	}).format(value);

export const formatPrice = (value: number, currency: string): string =>
	new Intl.NumberFormat(BCP47_SK, {
		style: "currency",
		currency,
	}).format(value);

export const formatTime = (value: number): string =>
	new Date(value).toLocaleTimeString(BCP47_SK, {
		hour: "2-digit",
		minute: "2-digit",
	});

export const formatDateTime = (value: number): string =>
	new Date(value).toLocaleDateString(BCP47_SK, {
		hour: "2-digit",
		minute: "2-digit",
	});

export const abbrNumber = (value: number | string): string => {
	if (!value) return "0";

	value = +value.toString();

	const thresholds = [1e6, 1e3];
	const abbr = ["M", "k"];
	for (let i = 0; i < thresholds.length; i++) {
		if (value >= thresholds[i]) {
			return Math.trunc(value / thresholds[i]).toFixed(0) + abbr[i];
		}
	}

	return value.toString();
};
