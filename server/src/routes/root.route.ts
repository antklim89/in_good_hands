import { FastifyInstance } from 'fastify';


export default async function route (app: FastifyInstance) {
    app.get('/', async () => {
        return { msg: 'Hello' };
    });
}
