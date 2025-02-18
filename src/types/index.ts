// https://stackoverflow.com/a/73384647
export type Tuple<T, N, R extends Array<T> = []> = R["length"] extends N
	? R
	: Tuple<T, N, [...R, T]>;
