import { useToast } from '@chakra-ui/react';
import { useState, useCallback, ChangeEventHandler } from 'react';

import { UpdateAdProps } from './UpdateAd.types';

import { api } from '~/utils';


export function useUpdateAdImages({ ad }: UpdateAdProps) {
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
