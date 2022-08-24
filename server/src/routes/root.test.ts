import { init } from '@/test';


const { app, prisma } = init();

describe('Root', () => {
    it('GET /', async () => {
        const users = await prisma.user.findMany();
        const data = await app.inject({ url: '/', method: 'GET', headers: { 'content-type': 'application/json' } });
        expect(data.json()).toHaveProperty('msg', 'Hello');
        expect(users).toHaveLength(3);
    });
});
