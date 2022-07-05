
module.exports = {
    register({ strapi }) {
        const extensionService = strapi.plugin('graphql').service('extension');

        extensionService.use({
            resolversConfig: {
                'Query.ads': {
                    auth: false,
                    middlewares: [
                        async (next, parent, args, context, info) => {
                            console.log('===== \n context.state', context.state);
                            const updatedArgs = {
                                ...args,
                                filters: {
                                    ...args.filters || {},
                                    user: { id: { eq: '1' } },
                                },
                            };

                            const res = await next(parent, updatedArgs, context, info);


                            return res;
                        },

                    ],
                },
            },
        });
    },
};

