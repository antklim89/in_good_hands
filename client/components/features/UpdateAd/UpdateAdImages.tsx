import { AddIcon } from '@chakra-ui/icons';
import { Box, IconButton, SimpleGrid, Text, Spinner } from '@chakra-ui/react';
import { UPLOAD_IMAGES_LIMIT } from '@in-good-hands/share/constants';
import { FC, useId } from 'react';

import { UpdateAdProps } from './UpdateAd.types';
import UpdateAdImage from './UpdateAdImage';
import { useUpdateAdImages } from './UpdateAdImages.use';


const UpdateAdImages: FC<UpdateAdProps> = ({ ad }) => {
    const { uploadedImages, loading, handleUpload, setUploadedImages } = useUpdateAdImages({ ad });
    const id = useId();

    return (
        <Box mb={2}>
            <Text color="black" pb={2}>
                Images ({uploadedImages.length} / {UPLOAD_IMAGES_LIMIT})
            </Text>
            <SimpleGrid columns={[4, 6, 8]} gap={1}>
                {uploadedImages.map((uploadedImage) => (
                    <UpdateAdImage
                        image={uploadedImage}
                        key={uploadedImage.id}
                        setUploadedImages={setUploadedImages}
                    />
                ))}
                {(uploadedImages.length < UPLOAD_IMAGES_LIMIT)
                && (
                    <>
                        <IconButton
                            aria-label="upload new image"
                            as="label"
                            disabled={loading}
                            htmlFor={id}
                            icon={loading ? <Spinner /> : <AddIcon />}
                            variant="outline"
                        />
                        <Box
                            multiple
                            accept="image/*"
                            as="input"
                            height={0}
                            id={id}
                            type="file"
                            width={0}
                            onChange={handleUpload}
                        />
                    </>
                )}
            </SimpleGrid>
        </Box>
    );
};

export default UpdateAdImages;
