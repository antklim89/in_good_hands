import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ZodError } from 'zod';

import { authSchema } from './Auth.schema';
import { AuthFormProps, AuthType } from './Auth.types';

import { useAuthContext } from '~/utils';


export function useAuthFormik({ type }: AuthFormProps) {
    const { login, register } = useAuthContext();
    const toast = useToast();

    const formik = useFormik<AuthType>({
        initialValues: { name: '', email: '', password: '', confirm: '' },
        async onSubmit(val) {
            try {
                if (type === 'login') {
                    await login(val);
                    toast({ title: 'You have successfully logged in!', status: 'success' });
                    location.reload();
                } else {
                    await register(val);
                    toast({ title: 'You have successfully registred!', status: 'success' });
                    location.reload();
                }
            } catch (error) {
                if (error instanceof Error) toast({ title: error.message, status: 'error' });
            }
        },
        async validate(val) {
            try {
                if (type === 'login') {
                    await authSchema.pick({ email: true, password: true }).parseAsync(val);
                } else {
                    await authSchema.pick({ email: true, password: true, name: true }).parseAsync(val);
                    if (val.confirm !== val.password) return { confirm: 'Passwords do not match.' };
                }
            } catch (error) {
                if (error instanceof ZodError) {
                    return error.formErrors.fieldErrors;
                }
            }
            return {};
        },
    });

    return formik;
}
