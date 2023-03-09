import { isDefined, isObject, isString } from './asserts';

describe('Assert Methods', () => {
	it('Should not return a defined value', () => {
		expect(isDefined()).toBeFalsy();
		expect(isDefined(undefined)).toBeFalsy();
		expect(isDefined(null)).toBeFalsy();
	});

	it('Should return a defined value', () => {
		expect(isDefined(12345)).toBeTruthy();
		expect(isDefined('truth')).toBeTruthy();
		expect(isDefined([])).toBeTruthy();
	});

	it('Should not be an object', () => {
		expect(isObject()).toBe(false);
		expect(isObject(null)).toBe(false);
		expect(isObject(undefined)).toBe(false);
		expect(isObject(10)).toBe(false);
		expect(isObject('')).toBe(false);
	});

	it('Should be an object', () => {
		expect(isObject({})).toBe(true);
		expect(isObject({ foo: 'bar' })).toBe(true);
	});

	it('Should not be a string', () => {
		expect(isString(12345)).toBeFalsy();
		expect(isString([])).toBeFalsy();
		expect(isString(undefined)).toBeFalsy();
		expect(isString(null)).toBeFalsy();
	});

	it('Should be a string', () => {
		expect(isString('')).toBeTruthy();
		expect(isString('string')).toBeTruthy();
	});
});
