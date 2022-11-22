import { registerSchema } from '@in-good-hands/server/src/schemas/authSchemas';
import zod from 'zod';


const props = registerSchema.properties;

export const authSchema = zod.object({
    name: zod.string()
        .trim()
        .max(props.name.maxLength)
        .min(props.name.minLength),
    email: zod.string()
        .email()
        .trim()
        .max(props.email.maxLength)
        .min(props.email.minLength),
    password: zod.string()
        .trim()
        .max(props.password.maxLength)
        .min(props.password.minLength),
    confirm: zod.string()
        .trim()
        .max(props.password.maxLength)
        .min(props.password.minLength),
});
