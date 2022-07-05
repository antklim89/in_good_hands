const { checkOwnerMiddleware } = require('./utils/checkOwnerMiddleware');


module.exports = {
    register({ strapi }) {
        const extensionService = strapi.plugin('graphql').service('extension');

        extensionService.use({
            resolversConfig: {
                'Mutation.updateAd': {
                    auth: true,
                    middlewares: [checkOwnerMiddleware(strapi)],
                },
                'Mutation.deleteAd': {
                    auth: true,
                    middlewares: [checkOwnerMiddleware(strapi)],
                },
            },
        });
    },
};


