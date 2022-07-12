"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOwnerMiddleware = void 0;
function checkOwnerMiddleware(strapi) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (next, parent, args, context, info) => {
        var _a, _b, _c, _d, _e;
        const userId = (_b = (_a = context.state) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
        const ad = await ((_d = (_c = strapi
            .service('api::ad.ad')) === null || _c === void 0 ? void 0 : _c.findOne) === null || _d === void 0 ? void 0 : _d.call(_c, args.id, { populate: { owner: { fields: ['id'] } } }));
        if (ad && ((_e = ad.owner) === null || _e === void 0 ? void 0 : _e.id) === userId) {
            return next(parent, args, context, info);
        }
        throw new Error('Forbidden');
    };
}
exports.checkOwnerMiddleware = checkOwnerMiddleware;
