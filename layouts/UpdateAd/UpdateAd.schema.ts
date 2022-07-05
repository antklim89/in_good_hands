import zod from 'zod';

import schema from '~/strapi/src/api/ad/content-types/ad/schema.json';
import { IEnumAdType } from '~/types';


const { attributes: attr } = schema;

export const updateAdSchema = zod.object({
    body: zod.string()
        .min(attr.body.minLength)
        .max(attr.body.maxLength),
    type: zod.enum<IEnumAdType, [IEnumAdType, ...IEnumAdType[]]>(attr.type.enum as [IEnumAdType, ...IEnumAdType[]]),
    breed: zod.string()
        .min(attr.breed.minLength)
        .max(attr.breed.maxLength),
    name: zod.string()
        .min(attr.name.minLength)
        .max(attr.name.maxLength),
    price: zod.number()
        .min(attr.price.min)
        .max(attr.price.max),
    tel: zod.string()
        .min(attr.tel.minLength)
        .max(attr.tel.maxLength),
    email: zod.string()
        .email()
        .min(attr.email.minLength)
        .max(attr.email.maxLength),
    birthday: zod.string(),
});
