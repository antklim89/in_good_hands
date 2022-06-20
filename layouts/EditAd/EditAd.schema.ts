import zod from 'zod';

import schema from '~/strapi/src/api/ad/content-types/ad/schema.json';


export const adEditSchema = zod.object({
    body: zod.string()
        .min(schema.attributes.body.minLength)
        .max(schema.attributes.body.maxLength),
    type: zod.enum(schema.attributes.type.enum as [string, ...string[]]),
    breed: zod.string()
        .min(schema.attributes.breed.minLength)
        .max(schema.attributes.breed.maxLength),
    name: zod.string()
        .min(schema.attributes.name.minLength)
        .max(schema.attributes.name.maxLength),
    price: zod.number()
        .min(schema.attributes.price.min)
        .max(schema.attributes.price.max),
    tel: zod.string()
        .min(schema.attributes.tel.minLength)
        .max(schema.attributes.tel.maxLength),
    email: zod.string()
        .email()
        .min(schema.attributes.email.minLength)
        .max(schema.attributes.email.maxLength),
    birthday: zod.string(),
});
