import fp from 'fastify-plugin';


export default fp(async (app) => {
    app.register(import('@fastify/multipart'));
});
