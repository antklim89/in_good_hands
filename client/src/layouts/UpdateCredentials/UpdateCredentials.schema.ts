import { USER_FORM } from '@in-good-hands/share/constants';
import { z } from 'zod';


export const updateCredentialsSchema = z.object({
    name: z.string()
        .min(USER_FORM.name.minLength)
        .max(USER_FORM.name.maxLength),
    tel: z.string()
        .min(USER_FORM.tel.minLength)
        .max(USER_FORM.tel.maxLength)
        .optional(),
    telegram: z.string()
        .max(USER_FORM.telegram.maxLength)
        .optional(),
    whatsapp: z.string()
        .max(USER_FORM.whatsapp.maxLength)
        .optional(),
    email: z.string()
        .email()
        .min(USER_FORM.email.minLength)
        .max(USER_FORM.email.maxLength),
});

export type UpdateCredentialsSchema = z.infer<typeof updateCredentialsSchema>
