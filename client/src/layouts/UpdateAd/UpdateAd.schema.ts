import { adInputSchema } from '@in-good-hands/server/src/schemas/adSchemas';
import { z } from 'zod';


const props = adInputSchema.properties;

export const updateAdSchema = z.object({
    description: z.string()
        .min(props.description.minLength)
        .max(props.description.maxLength),
    type: z.enum(props.type.enum),
    breed: z.string()
        .min(props.breed.minLength)
        .max(props.breed.maxLength),
    name: z.string()
        .max(props.name.maxLength),
    price: z.number()
        .min(props.price.minimum)
        .max(props.price.maximum),
    tel: z.string()
        .min(props.tel.minLength)
        .max(props.tel.maxLength),
    telegram: z.string()
        .max(props.telegram.maxLength)
        .optional(),
    whatsapp: z.string()
        .max(props.whatsapp.maxLength)
        .optional(),
    email: z.string()
        .email()
        .min(props.email.minLength)
        .max(props.email.maxLength),
    birthday: z.string(),
    isPublished: z.boolean(),
});

export type UpdateAdSchema = z.infer<typeof updateAdSchema>
