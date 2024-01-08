import fp from 'fastify-plugin';


export default fp(async (app) => {
    await app.register(import('@fastify/swagger'));

    await app.register(import('@fastify/swagger-ui'), {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false,
        },
        transformSpecificationClone: true,
    });
});
