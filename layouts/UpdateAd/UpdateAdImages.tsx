import { AddIcon } from '@chakra-ui/icons';
import {
    Box, IconButton, HStack, Text, useToast, Spinner,
} from '@chakra-ui/react';
import { ChangeEventHandler, FC, useCallback, useState } from 'react';

import { requestUploadAdImage } from '~/utils';

import { UpdateAdImagesProps } from './UpdateAd.types';
import UpdateAdImage from './UpdateAdImage';


const UpdateAdImages: FC<UpdateAdImagesProps> = ({ images, id: adId }) => {
    const toast = useToast();
    const [uploadedImages, setUploadedImages] = useState(images.data);
    const [loading, setLoading] = useState(false);

    const handleUpload: ChangeEventHandler<HTMLInputElement> = useCallback(async (e) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files).filter((file) => (/image\/(jpeg|jpg|png|webp)/).test(file.type));
        if (files.length === 0) return;
        try {
            setLoading(true);
            const newImages = await requestUploadAdImage(files, adId);
            setUploadedImages((prevImages) => [...prevImages, ...newImages]);
        } catch (error) {
            toast({ title: 'Failed to upload images', status: 'error' });
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <Box mb={2}>
            <Text pb={2}>
                Images
            </Text>
            <HStack>
                {uploadedImages.map((uploadedImage) => (
                    <UpdateAdImage key={uploadedImage.id} {...uploadedImage} setUploadedImages={setUploadedImages} />
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
