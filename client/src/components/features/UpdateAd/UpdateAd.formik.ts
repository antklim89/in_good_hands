import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { ZodError } from 'zod';

import { UpdateAdSchema, updateAdSchema } from './UpdateAd.schema';
import { UpdateAdProps } from './UpdateAd.types';

import { api } from '~/utils';


export function useUpdateAdFormik({ ad }: UpdateAdProps) {
    const toast = useToast();

    const formik = useFormik<UpdateAdSchema>({
        initialValues: {
            breed: ad.breed || '',
            description: ad.description || '',
            email: ad.email || '',
            name: ad.name || '',
            price: ad.price || 0,
            tel: ad.tel || '',
            telegram: ad.telegram || '',
            whatsapp: ad.whatsapp || '',
            birthday: new Date(ad.birthday || '').toISOString().split('T')[0],
            type: ad.type || 'cat',
            isPublished: ad.isPublished || false,
        },
        async onSubmit(data) {
            try {
                await api().ad.update({ id: ad.id }, data);
                toast({ title: 'Ad updated successfully!', status: 'success' });
            } catch (error) {
                if (error instanceof AxiosError) toast({ title: error.response?.data.message || error.message, status: 'error' });
            }
        },
        async validate(data) {
            try {
                await updateAdSchema.parseAsync(data);
            } catch (error) {
                if (error instanceof ZodError) return error.formErrors.fieldErrors;
            }
            return {};
        },
        validateOnMount: true,
    });

    return formik;
}
