import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, useToast, Spinner } from '@chakra-ui/react';
import Image from 'next/image';
import { FC, MouseEventHandler, useCallback, useState } from 'react';

import { UpdateAdImageProps } from './UpdateAd.types';

import { api, getApiURL } from '~/utils';


const UpdateAdImage: FC<UpdateAdImageProps> = ({ image, setUploadedImages }) => {
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
                            src={getApiURL(image.src)}
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
            variant="outline"
            width={90}
            onClick={handleDelete}
        />
    );
};

export default UpdateAdImage;
