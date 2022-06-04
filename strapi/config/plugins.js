const { join } = require('path');


module.exports = () => ({
    graphql: {
        enabled: true,
        config: {
            generateArtifacts: true,
            artifacts: {
                schema: join(__dirname, '..', 'schema.graphql'),
                typegen: join(__dirname, '..', 'types.d.ts'),
            },
            endpoint: '/graphql',
            shadowCRUD: true,
            playgroundAlways: true,
            depthLimit: 7,
            amountLimit: 100,
            apolloServer: {
                tracing: false,
                introspection: true,
            },
        },
    },
});
