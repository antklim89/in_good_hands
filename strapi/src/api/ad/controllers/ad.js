

/**
 *  ad controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::ad.ad', (/* { strapi }*/) => ({

    /**
     * @type { import('@strapi/strapi/lib/core-api/controller').CollectionTypeController['create'] }
     */
    async create(ctx) {

        const data = await super.create(ctx);

        return data;
    },
}));
