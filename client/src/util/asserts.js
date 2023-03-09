export function isDefined(value) {
	return value !== null && typeof value !== 'undefined';
}

export function isObject(value) {
	return isDefined(value) && typeof value === 'object' && !Array.isArray(value);
}

export function isString(value) {
	return isDefined(value) && typeof value === 'string';
}
