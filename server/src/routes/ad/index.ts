import { FastifyInstance } from 'fastify';


export default async function AdRoutes(app: FastifyInstance) {
    app.register(import('./create-new'));
    app.register(import('./delete'));
    app.register(import('./find-ids'));
    app.register(import('./find-many'));
    app.register(import('./find-my-ads'));
    app.register(import('./find-one'));
    app.register(import('./find-update-data'));
    app.register(import('./update'));
}
