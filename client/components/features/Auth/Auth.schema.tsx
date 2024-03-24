import { USER_FORM } from '@in-good-hands/share/constants';
import zod from 'zod';


export const authSchema = zod.object({
    name: zod.string()
        .trim()
        .max(USER_FORM.name.maxLength)
        .min(USER_FORM.name.minLength),
    email: zod.string()
        .email()
        .trim()
        .max(USER_FORM.email.maxLength)
        .min(USER_FORM.email.minLength),
    password: zod.string()
        .trim()
        .max(USER_FORM.password.maxLength)
        .min(USER_FORM.password.minLength),
    confirm: zod.string()
        .trim()
        .max(USER_FORM.password.maxLength)
        .min(USER_FORM.password.minLength),
});
