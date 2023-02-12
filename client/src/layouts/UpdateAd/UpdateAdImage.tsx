import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, Spinner } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import { UpdateAdImageProps } from './UpdateAd.types';
import { useUpdateAdImage } from './UpdateAdImage.use';


const SCALE = 15;
const IMAGE_HEIGHT = 768 / SCALE;
const IMAGE_WIDTH = 1280 / SCALE;

const UpdateAdImage: FC<UpdateAdImageProps> = ({ image, setUploadedImages, ...props }) => {
    const { handleDelete, loading } = useUpdateAdImage({ image, setUploadedImages });

    return (
        <IconButton
            _hover={{
                '& .delete-icon': { display: 'block' },
                '& img': { filter: 'blur(2px) opacity(0.4)' },
            }}
            aria-label="delete image"
            disabled={loading}
            icon={
                <>
                    <Box className="delete-image" sx={{ 'img': { width: '100%', objectFit: 'cover', aspectRatio: `${IMAGE_WIDTH} / ${IMAGE_HEIGHT}` } }}>
                        <Image
                            fill
                            alt="uploaded image"
                            src={image.thumbnail}
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
            overflow="hidden"
            {...props}
            variant="outline"
            onClick={handleDelete}
        />
    );
};

export default UpdateAdImage;
