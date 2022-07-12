"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkOwnerMiddleware_1 = require("./utils/checkOwnerMiddleware");
const main = {
    register({ strapi }) {
        const extensionService = strapi.plugin('graphql').service('extension');
        extensionService.use({
            resolversConfig: {
                'Mutation.updateAd': {
                    auth: true,
                    middlewares: [(0, checkOwnerMiddleware_1.checkOwnerMiddleware)(strapi)],
                },
                'Mutation.deleteAd': {
                    auth: true,
                    middlewares: [(0, checkOwnerMiddleware_1.checkOwnerMiddleware)(strapi)],
                },
            },
        });
    },
};
exports.default = main;
