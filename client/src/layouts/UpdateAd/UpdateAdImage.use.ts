import { useToast } from '@chakra-ui/react';
import { useState, MouseEventHandler, useCallback } from 'react';

import { UpdateAdImageProps } from './UpdateAd.types';

import { api } from '~/utils';


export function useUpdateAdImage({ image, setUploadedImages }: Pick<UpdateAdImageProps, 'image'|'setUploadedImages'>) {
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
