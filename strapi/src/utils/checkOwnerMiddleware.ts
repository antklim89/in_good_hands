import { Strapi } from '@strapi/strapi';
import type { CollectionTypeService } from '@strapi/strapi/lib/core-api/service';

import { NexusGenFieldTypes } from '../../types';


export function checkOwnerMiddleware(strapi: Strapi) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async (next: any, parent: unknown, args: {id: string}, context: any, info: unknown) => {
        const userId = context.state?.user?.id;

        const ad = await strapi
            .service<CollectionTypeService>('api::ad.ad')
            ?.findOne?.(args.id, { populate: { owner: { fields: ['id'] } } }) as NexusGenFieldTypes['Ad'] & {owner: {id: string}};

        if (ad && ad.owner?.id === userId) {
            return next(parent, args, context, info);
        }

        throw new Error('Forbidden');
    };
}
