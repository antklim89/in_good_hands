import { Strapi } from '@strapi/strapi';

import { checkOwnerMiddleware } from './utils/checkOwnerMiddleware';


const main = {
    register({ strapi }: { strapi: Strapi }) {
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
export default main;
