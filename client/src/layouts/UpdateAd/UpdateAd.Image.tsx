import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, Spinner } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import { UpdateAdImageProps } from './UpdateAd.types';
import { useUpdateAdImage } from './UpdateAd.use';

import { getApiURL } from '~/utils';


const UpdateAdImage: FC<UpdateAdImageProps> = ({ image, setUploadedImages }) => {
    const { handleDelete, loading } = useUpdateAdImage({ image, setUploadedImages });

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
