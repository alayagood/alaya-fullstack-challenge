import apiCaller from "../apiCaller";


const fetchMock = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({message: 'ok'}),
    headers: new Map([['Content-type', 'application/json test']]),
    ok: true
  })
);


describe('apiCaller', () => {
  beforeEach(() => {
    global.fetch = fetchMock;
  })

  it('should fetch a reource', async () => {
    const result = await apiCaller('test', 'get');
    expect(result).toEqual({message: 'ok'})
  })

  it('should not fetch a reource', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('test'),
        headers: new Map([['Content-type', 'test']]),
        ok: false
      })
    );

    await expect(apiCaller('test', 'get')).rejects.toThrow()
  })

  it('should fetch a reource', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('OK'),
        headers: new Map([['Content-type', 'test']]),
        ok: true
      })
    );
    const result = await apiCaller('test', 'get');

    expect(result).toEqual('OK')
  })
})