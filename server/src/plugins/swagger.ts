import fp from 'fastify-plugin';


export default fp(async (app) => {
    app.register(import('@fastify/swagger'), {
        // routePrefix: '/docs',
        swagger: {
            info: {
                title: 'In Good Hands API',
                description: 'Swagger API',
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
            definitions: {},

            securityDefinitions: {
                auth: {
                    type: 'apiKey',
                    name: 'auth',
                    in: 'header',
                },
            },
        },
        // uiConfig: {
        //     docExpansion: 'none',
        //     deepLinking: false,
        // },
        // exposeRoute: true,
    });
});
