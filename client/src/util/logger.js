import { isString, isObject } from './asserts';

const TRACER_TAG = '[ALAYAGOOD_LOG]';

function parseArguments(message, ...optionalParams) {
	const logArguments = [message, ...optionalParams];

	return logArguments
		.map((arg) => {
			if (arg instanceof Error) {
				const error = arg;

				return `${error.message}\n${error.stack ?? ''}`;
			}

			if (isObject(arg) || Array.isArray(arg)) {
				return JSON.stringify(arg, null, 2);
			}

			return (isString(arg) ? arg : String(arg)).trim();
		})
		.join(' ');
}

export default class Logger {
	static error(message, ...optionalParams) {
		// eslint-disable-next-line no-console
		console.error(
			`${TRACER_TAG} ${parseArguments(message, ...optionalParams)}`
		);
	}

	static info(message, ...optionalParams) {
		// eslint-disable-next-line no-console
		console.info(`${TRACER_TAG} ${parseArguments(message, ...optionalParams)}`);
	}

	static warn(message, ...optionalParams) {
		// eslint-disable-next-line no-console
		console.warn(`${TRACER_TAG} ${parseArguments(message, ...optionalParams)}`);
	}
}
