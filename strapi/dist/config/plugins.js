"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const plugins = () => ({
    graphql: {
        enabled: true,
        config: {
            generateArtifacts: true,
            artifacts: {
                schema: (0, path_1.join)(process.cwd(), 'schema.graphql'),
                typegen: (0, path_1.join)(process.cwd(), 'types.d.ts'),
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
exports.default = plugins;
