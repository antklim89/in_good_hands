import { join } from 'path';


const plugins = () => ({
    graphql: {
        enabled: true,
        config: {
            generateArtifacts: true,
            artifacts: {
                schema: join(process.cwd(), 'schema.graphql'),
                typegen: join(process.cwd(), 'types.d.ts'),
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

export default plugins;
