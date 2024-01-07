import { FastifyInstance } from 'fastify';


export default async function AdRoutes(app: FastifyInstance) {
    app.register(import('./create'));
    app.register(import('./delete'));
    app.register(import('./find-many'));
}
