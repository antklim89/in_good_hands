import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, Spinner } from '@chakra-ui/react';
import { IMAGE_HEIGHT, IMAGE_WIDHT } from '@in-good-hands/share/constants';
import Image from 'next/image';
import { FC } from 'react';

import { UpdateAdImageProps } from './UpdateAd.types';
import { useUpdateAdImage } from './UpdateAdImage.use';


const SCALE = 15;
const imgWidth = IMAGE_WIDHT / SCALE;
const imgHeight = IMAGE_HEIGHT / SCALE;

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
                    <Box className="delete-image" position="relative" sx={{ 'img': { width: '100%', objectFit: 'cover', aspectRatio: `${imgWidth} / ${imgHeight}` } }}>
                        <Image
                            alt="uploaded image"
                            height={imgHeight}
                            src={image.thumbnail}
                            width={imgWidth}
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
