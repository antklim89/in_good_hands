import { AddIcon } from '@chakra-ui/icons';
import { Box, IconButton, HStack, Text, Spinner } from '@chakra-ui/react';
import { FC } from 'react';

import { UpdateAdProps } from './UpdateAd.types';
import UpdateAdImage from './UpdateAdImage';
import { useUpdateAdImages } from './UpdateAdImages.use';


const UpdateAdImages: FC<UpdateAdProps> = ({ ad }) => {
    const { uploadedImages, loading, handleUpload, setUploadedImages } = useUpdateAdImages({ ad });

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
                            ? <Spinner />
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
