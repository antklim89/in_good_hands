import { z } from 'zod';

import { adInputSchema } from '~/fastify/src/schemas/ad.schema';


const props = adInputSchema.properties;

export const updateAdSchema = z.object({
    description: z.string()
        .min(props.description.minLength)
        .max(props.description.maxLength)
        .optional(),
    type: z.enum(props.type.enum)
        .optional(),
    breed: z.string()
        .min(props.breed.minLength)
        .max(props.breed.maxLength)
        .optional(),
    name: z.string()
        .min(props.name.minLength)
        .max(props.name.maxLength)
        .optional(),
    price: z.number()
        .min(props.price.minimum)
        .max(props.price.maximum)
        .optional(),
    tel: z.string()
        .min(props.tel.minLength)
        .max(props.tel.maxLength)
        .optional(),
    email: z.string()
        .email()
        .min(props.email.minLength)
        .max(props.email.maxLength)
        .optional(),
    // birthday: z.string(),
    isPublished: z.boolean(),
});

export type UpdateAdSchema = z.infer<typeof updateAdSchema>
