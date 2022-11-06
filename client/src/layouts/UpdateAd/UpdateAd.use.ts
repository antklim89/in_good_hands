import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState, MouseEventHandler, useCallback, ChangeEventHandler } from 'react';
import { ZodError } from 'zod';

import { UpdateAdSchema, updateAdSchema } from './UpdateAd.schema';
import { UpdateAdImageProps, UpdateAdProps } from './UpdateAd.types';

import { api } from '~/utils';


export function useUpdateAd({ ad }: UpdateAdProps) {
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
                if (error instanceof Error) toast({ title: error.message, status: 'error' });
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

    return { formik };
}

export function useUpdateAdImages({ ad }:UpdateAdProps) {
    const toast = useToast();
    const [uploadedImages, setUploadedImages] = useState(ad.images);
    const [loading, setLoading] = useState(false);

    const handleUpload: ChangeEventHandler<HTMLInputElement> = useCallback(async (e) => {
        if (!e.target.files) return;
        const images = Array.from(e.target.files);
        if (images.length === 0) return;

        images.forEach(async (imageFile) => {
            if (!(/image\/(jpeg|jpg|png|webp)/).test(imageFile.type)) return;
            try {
                setLoading(true);
                const { data: newImage } = await api().image.upload({ adId: ad.id }, { image: imageFile });
                setUploadedImages((prevImages) => [...prevImages, newImage]);
            } catch (error) {
                toast({ title: 'Failed to upload images', status: 'error' });
            } finally {
                setLoading(false);
            }
        });
    }, []);

    return { uploadedImages, loading, handleUpload, setUploadedImages };
}

export function useUpdateAdImage({ image, setUploadedImages }:UpdateAdImageProps) {
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const handleDelete: MouseEventHandler<HTMLElement> = useCallback(async () => {
        try {
            setLoading(true);
            await api().image.delete({ imageId: image.id });
            setUploadedImages((prevImgs) => prevImgs.filter((prevImg) => String(prevImg.id) !== String(image.id)));
        } catch (error) {
            toast({ title: 'Failed to delete image', status: 'error' });
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, handleDelete };
}
