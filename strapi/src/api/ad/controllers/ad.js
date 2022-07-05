const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::ad.ad', ({ strapi }) => ({

    /**
     * @type { import('@strapi/strapi/lib/core-api/controller').CollectionTypeController['create'] }
     */
    async new(ctx) {
        const { user } = ctx.state;

        const data = {
            body: '',
            type: 'cat',
            breed: '',
            name: '',
            price: 0,
            tel: '',
            email: '',
            birthday: new Date().toISOString().split('T')[0],
            owner: user.id,
        };
        const entity = await strapi.db.query('api::ad.ad').create({ data });
        return entity.id;
    },
}));
