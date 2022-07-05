

function checkOwnerMiddleware(strapi) {
    return async (next, parent, args, context, info) => {
        const userId = context.state?.user?.id;

        const ad = await strapi.service('api::ad.ad').findOne(args.id, { populate: { owner: { fields: ['id'] } } });

        if (ad && ad.owner?.id === userId) {
            return next(parent, args, context, info);
        }
        throw new Error('Forbidden');
    };
}

exports.checkOwnerMiddleware = checkOwnerMiddleware;
