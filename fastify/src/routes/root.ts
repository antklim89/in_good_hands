import { FastifyInstance } from 'fastify';


export default async function route (fastify: FastifyInstance) {
    fastify.get('/', async (request, reply) => {
        return { root: true };
    });
}
