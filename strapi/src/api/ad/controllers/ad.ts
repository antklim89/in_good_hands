import { factories } from '@strapi/strapi';


export default factories.createCoreController('api::ad.ad', ({ strapi }) => ({
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

        // @ts-expect-error error
        const entity = await strapi.db.query('api::ad.ad').create({ data });
        return entity.id;
    },
}));
