import { AddIcon } from '@chakra-ui/icons';
import { Button, IconButton, Theme, useMediaQuery, useTheme } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { CreateAdButtonProps } from './CreateAdButton.types';
import { useCreateAdButton } from './CreateAdButton.use';

import Protected from '~/components/helpers/Protected';


const CreateAdButton: FC<CreateAdButtonProps> = (props) => {
    const { breakpoints } = useTheme<Theme>();
    const [isLargerThen] = useMediaQuery(`(min-width: ${breakpoints.sm})`);
    const { loading, handleCreateNewAd } = useCreateAdButton(props);
    const { route } = useRouter();

    if (route.startsWith('/ads/update')) return null;

    return (
        <Protected fallback="">
            {isLargerThen
                ? (
                    <Button
                        _hover={{ color: 'primary.600', bg: 'primary.50' }}
                        color="white"
                        isLoading={loading}
                        loadingText="creating"
                        textTransform="uppercase"
                        variant="ghost"
                        onClick={handleCreateNewAd}
                    >
                        create ad
                    </Button>
                )
                : (
                    <IconButton
                        _hover={{ color: 'primary.600', bg: 'primary.50' }}
                        aria-label="create ad"
                        borderRadius="100%"
                        bottom="2%"
                        color="white"
                        fontSize="2xl"
                        height={50}
                        isLoading={loading}
                        position="fixed"
                        right="2%"
                        textTransform="uppercase"
                        variant="solid"
                        width={50}
                        zIndex={1000}
                        onClick={handleCreateNewAd}
                    >
                        <AddIcon />
                    </IconButton>
                )}
        </Protected>
    );
};

export default CreateAdButton;
