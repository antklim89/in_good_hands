import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect } from 'react';

import { UpdateCredentialsSchema } from './UpdateCredentials.schema';

import { useAuthContext, api } from '~/utils';


export function useUpdateCredentials() {
    const { user } = useAuthContext();
    const toast = useToast();

    const formik = useFormik<UpdateCredentialsSchema>({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            tel: '',
            telegram: '',
            whatsapp: '',
        },
        async onSubmit(data) {
            const filtredData = Object.entries(data).reduce((acc, [key, value]) => {
                if (typeof value === 'string' && value.length > 0) acc[key as keyof typeof data] = value;
                return acc;
            }, {} as Partial<UpdateCredentialsSchema>);

            try {
                await api().auth.update(filtredData);
                toast({ title: 'Credentials successfully updated.', status: 'error' });
            } catch (error) {
                if (error instanceof Error) toast({ title: error.message, status: 'error' });
            }
        },
    });

    useEffect(() => {
        api().auth.me().then(({ data }) => {
            formik.setValues({
                name: data?.name || '',
                email: data?.email || '',
                tel: data?.tel || '',
                telegram: data?.telegram || '',
                whatsapp: data?.whatsapp || '',
            });
        });
    }, []);

    return { formik };
}