import zod from 'zod';


export const authSchema = zod.object({
    name: zod.string()
        .trim()
        .max(50)
        .min(2),
    password: zod.string()
        .trim()
        .max(50)
        .min(5),
});
