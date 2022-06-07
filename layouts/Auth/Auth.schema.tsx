import zod from 'zod';


export const authSchema = zod.object({
    username: zod.string()
        .trim()
        .max(50)
        .min(2),
    email: zod.string()
        .email()
        .trim()
        .max(50)
        .min(2),
    password: zod.string()
        .trim()
        .max(50)
        .min(5),
});
