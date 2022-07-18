import { init } from '~/fastify/test';


const { app } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/find-many',
    method: 'GET',
    headers: { 'content-type': 'application/json' },
};

describe('POST /ad/find-many', () => {
    it('should find ads', async () => {
        const response = await app.inject({ ...defaultOptions });
        const data = response.json();

        expect(data).toHaveLength(3);
    });
});
