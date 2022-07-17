import { init } from '~/fastify/test';


const { app, close } = init('ROOT');

describe('Test', () => {
    afterAll(close);

    it('default root route', async () => {
        const data = await app.inject({ url: '/', method: 'GET', headers: { 'content-type': 'application/json' } });
        expect(data.json()).toHaveProperty('msg', 'Hello');
    });
});
