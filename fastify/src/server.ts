// Require the framework and instantiate it
import fastify from 'fastify';


const app = fastify({ logger: true });


app.register(
    import('@fastify/compress'),
    { global: false },
);

app.register(import('@fastify/cors'), {
    // put your options here
});

app.register(import('@fastify/multipart'));

// Declare a route
app.get('/', async (request, reply) => {
    return { hello: 'YYYYYdsasdssad' };
});

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
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'user', description: 'User related end-points' },
            { name: 'code', description: 'Code related end-points' },
        ],
        definitions: {
            User: {
                type: 'object',
                required: ['id', 'email'],
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                },
            },
        },
        securityDefinitions: {
            apiKey: {
                type: 'apiKey',
                name: 'apiKey',
                in: 'header',
            },
        },
    },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
    },
    uiHooks: {
        onRequest (request, reply, next) {
            next();
        },
        preHandler (request, reply, next) {
            next();
        },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
});


// Run the server!
export const start = async () => {
    try {
        await app.listen({ port: 3000 });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
