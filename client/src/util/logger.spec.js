import Logger, { parseArguments } from './logger';

describe('Logger Methods', () => {
	let infoSpy;

	beforeEach(() => {
		jest.clearAllMocks();

		infoSpy = jest.spyOn(console, 'info');
	});

	it('Should parse string arguments', () => {
		expect(parseArguments('here', 'is', 'one', 'message')).toBe(
			'here is one message'
		);
	});

	it('Should parse error arguments', () => {
		expect(parseArguments(new Error('server_error'))).toMatch(
			/Error: server_error.*/
		);
	});

	it('Should parse thrown exceptions', () => {
		try {
			throw new Error('server_error');
		} catch (error) {
			expect(parseArguments(error)).toMatch(/Error: server_error.*/);
		}
	});

	describe('Info', () => {
		it('Should log a message', () => {
			Logger.info('update customer');

			expect(infoSpy).toHaveBeenCalledWith('[ALAYAGOOD_LOG] update customer');
		});

		it('Should log a stringified object message', () => {
			Logger.info(
				'trying to process record',
				JSON.stringify(
					{
						foo: 'bar',
					},
					null,
					2
				)
			);

			expect(infoSpy).toHaveBeenCalledWith(
				'[ALAYAGOOD_LOG] trying to process record {\n  "foo": "bar"\n}'
			);
		});
	});
});
