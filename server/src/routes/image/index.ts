import { FastifyInstance } from 'fastify';


export default async function AdRoutes(app: FastifyInstance) {
    app.register(import('./upload'));
    app.register(import('./delete'));
}
