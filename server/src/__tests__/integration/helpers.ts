
import request from 'supertest';

export async function waitForServerToStart(url: string, timeout = 30000) {
    const startTimestamp = Date.now();

    // eslint-disable-next-line no-constant-condition
    while (true) {
        try {
            await request(url).get('/posts');


            break; // Server is up
        } catch (error) {
            if (Date.now() - startTimestamp > timeout) {
                throw new Error('Server did not start within the timeout.');
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}
