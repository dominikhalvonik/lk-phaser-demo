// Part before 'at' sign (@) from validate e-mail helper plus space.
const VALID_USERNAME_REGEXP = /^[ a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;

export const validateUsername = (username: string): boolean =>
	VALID_USERNAME_REGEXP.test(username);
