import app from '../app';


describe('Test', () => {

    afterAll(() => {
        app.close();
    });

    it('default root route', async () => {
        const data = await app.inject({ url: '/', method: 'GET', headers: { 'content-type': 'application/json' } });
        expect(data.json()).toHaveProperty('msg', 'Hello');
    });
});
