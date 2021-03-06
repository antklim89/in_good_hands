import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, useToast, Spinner } from '@chakra-ui/react';
import Image from 'next/image';
import { FC, MouseEventHandler, useCallback, useState } from 'react';

import { getStrapiUrl, requestDeleteAdImage } from '~/utils';

import { UpdateAdImageProps } from './UpdateAd.types';


const UpdateAdImage: FC<UpdateAdImageProps> = ({ attributes, id: imgId, setUploadedImages }) => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const handleDelete: MouseEventHandler<HTMLElement> = useCallback(async () => {
        try {
            setLoading(true);
            const deletedImgId = await requestDeleteAdImage(imgId);
            setUploadedImages((prevImages) => prevImages.filter((img) => String(img.id) !== String(deletedImgId)));
        } catch (error) {
            toast({ title: 'Failed to delete image', status: 'error' });
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <IconButton
            _hover={{
                '& .delete-icon': { display: 'block' },
                '& .delete-image': { filter: 'blur(7px) opacity(0.4)' },
            }}
            aria-label="delete image"
            disabled={loading}
            height={90}
            icon={
                <>
                    <Box className="delete-image">
                        <Image
                            alt="uploaded image"
                            height={75}
                            src={getStrapiUrl(attributes.url)}
                            width={75}
                        />
                    </Box>
                    {loading
                        ? (
                            <Spinner position="absolute" />
                        )
                        : (
                            <DeleteIcon
                                className="delete-icon"
                                color="red.500"
                                display="none"
                                position="absolute"
                            />
                        )}
                </>
            }
            key={imgId}
            variant="outline"
            width={90}
            onClick={handleDelete}
        />
    );
};

export default UpdateAdImage;
