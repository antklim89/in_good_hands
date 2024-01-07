import { FastifyInstance } from 'fastify';


export default async function AdRoutes(app: FastifyInstance) {
    app.register(import('../auth/change-password'));
    app.register(import('../auth/login'));
    app.register(import('../auth/me'));
    app.register(import('../auth/register'));
    app.register(import('../auth/update'));
}
