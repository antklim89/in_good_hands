import { AddIcon } from '@chakra-ui/icons';
import {
    Box, IconButton, HStack, Text, useToast, Spinner,
} from '@chakra-ui/react';
import { ChangeEventHandler, FC, useCallback, useState } from 'react';

import { UpdateAdProps } from './UpdateAd.types';
import UpdateAdImage from './UpdateAdImage';

import { api } from '~/utils';


const UpdateAdImages: FC<UpdateAdProps> = ({ ad }) => {
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

    return (
        <Box mb={2}>
            <Text pb={2}>
                Images
            </Text>
            <HStack>
                {uploadedImages.map((uploadedImage) => (
                    <UpdateAdImage
                        image={uploadedImage}
                        key={uploadedImage.id}
                        setUploadedImages={setUploadedImages}
                    />
                ))}
                <IconButton
                    aria-label="upload new image"
                    as="label"
                    disabled={loading}
                    height={90}
                    icon={
                        loading
                            ? (
                                <Spinner />
                            )
                            : (
                                <>
                                    <AddIcon />
                                    <Box
                                        multiple
                                        accept="image/*"
                                        as="input"
                                        display="none"
                                        type="file"
                                        onChange={handleUpload}
                                    />
                                </>
                            )
                    }
                    variant="outline"
                    width={90}
                />
            </HStack>
        </Box>
    );
};

export default UpdateAdImages;
