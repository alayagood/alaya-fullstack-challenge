import {getToken, resetToken, setToken} from "./token";

describe('Set a token in cookies', () => {
    it('should set a token in document.cookie', () => {
        let cookieSpy = "";
        jest.spyOn(document, 'cookie', 'set').mockImplementation(cookie => (cookieSpy += cookie));

        let date = new Date('2023-01-01 00:00');
        Date.now = jest.fn(() => date.getTime());
        const value = 'testToken';
        const expires = new Date(date.getTime() + 1000*60*60*24).toUTCString();

        setToken(value);

        expect(cookieSpy).toBe('token=' + encodeURIComponent(value) + ';expires=' + expires + '; path=/');

    });
});

describe('Get a token', () => {
    it('should retrieve the token from the document.cookie', () => {
        const mockCookie = 'token=testToken; otherCookie=value';
        jest.spyOn(document, 'cookie', 'get').mockReturnValue(mockCookie);

        const token = getToken();

        expect(token).toBe('testToken');
    });

    it('should return an empty string if token is not found', () => {
        const mockCookie = 'otherCookie=value';
        jest.spyOn(document, 'cookie', 'get').mockReturnValue(mockCookie);

        const token = getToken();

        expect(token).toBe('');
    });
});

describe('Reset token', () => {
    it('should reset the token in document.cookie', () => {
        let cookieSpy = "";
        jest.spyOn(document, 'cookie', 'set').mockImplementation(cookie => (cookieSpy += cookie));

        resetToken();

        expect(cookieSpy).toBe('token=;expires=-1;path=/');
    });
});
