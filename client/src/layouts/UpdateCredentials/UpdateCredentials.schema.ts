import { userProfileSchema } from '@in-good-hands/server/src/schemas/auth.schema';
import { z } from 'zod';


const props = userProfileSchema.properties;

export const updateCredentialsSchema = z.object({
    name: z.string()
        .min(props.name.minLength)
        .max(props.name.maxLength),
    tel: z.string()
        .min(props.tel.minLength)
        .max(props.tel.maxLength)
        .optional(),
    telegram: z.string()
        .min(props.telegram.minLength)
        .max(props.telegram.maxLength)
        .optional(),
    whatsapp: z.string()
        .min(props.whatsapp.minLength)
        .max(props.whatsapp.maxLength)
        .optional(),
    email: z.string()
        .email()
        .min(props.email.minLength)
        .max(props.email.maxLength),
});

export type UpdateCredentialsSchema = z.infer<typeof updateCredentialsSchema>
