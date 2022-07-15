import fp from 'fastify-plugin';


export default fp(async (app) => {
    app.register(import('@fastify/swagger'), {
        routePrefix: '/documentation',
        swagger: {
            info: {
                title: 'Test swagger',
                description: 'Testing the Fastify swagger API',
                version: '0.1.0',
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here',
            },
            host: 'localhost:8000',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'code', description: 'Code related end-points' },
            ],
            definitions: {},

            securityDefinitions: {
                auth: {
                    type: 'apiKey',
                    name: 'auth',
                    in: 'header',
                },
            },
        },
        uiConfig: {
            docExpansion: 'none',
            deepLinking: false,
        },
        exposeRoute: true,
    });
});
