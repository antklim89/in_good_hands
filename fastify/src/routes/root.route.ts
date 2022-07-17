import { FastifyInstance } from 'fastify';


export default async function route (app: FastifyInstance) {
    app.get('/', async () => {
        await app.prisma.user.create({ data: {
            email: `email${Math.random()}`,
            hash: 'xxx',
            name: 'Name',
        } });
        return { msg: 'Hello' };
    });
}
