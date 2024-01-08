import { AD_FORM } from '@in-good-hands/share/constants';
import { z } from 'zod';


export const updateAdSchema = z.object({
    description: z.string()
        .min(AD_FORM.description.minLength)
        .max(AD_FORM.description.maxLength),
    type: z.enum(AD_FORM.type.enum),
    breed: z.string()
        .min(AD_FORM.breed.minLength)
        .max(AD_FORM.breed.maxLength),
    name: z.string()
        .max(AD_FORM.name.maxLength),
    price: z.number()
        .min(AD_FORM.price.minimum)
        .max(AD_FORM.price.maximum),
    tel: z.string()
        .min(AD_FORM.tel.minLength)
        .max(AD_FORM.tel.maxLength),
    telegram: z.string()
        .max(AD_FORM.telegram.maxLength)
        .optional(),
    whatsapp: z.string()
        .max(AD_FORM.whatsapp.maxLength)
        .optional(),
    email: z.string()
        .email()
        .min(AD_FORM.email.minLength)
        .max(AD_FORM.email.maxLength),
    birthday: z.string(),
    isPublished: z.boolean(),
});

export type UpdateAdSchema = z.infer<typeof updateAdSchema>
