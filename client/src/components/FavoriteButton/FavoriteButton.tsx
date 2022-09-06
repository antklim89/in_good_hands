import { StarIcon } from '@chakra-ui/icons';
import { Button, Tooltip, useToast } from '@chakra-ui/react';
import { FC, useCallback, useRef, useState } from 'react';

import { FavoriteButtonProps } from './FavoriteButton.types';

import { api, useAuthContext } from '~/utils';


const FavoriteButton: FC<FavoriteButtonProps> = ({ adId, inFavorites: initInFavorites, iconProps, ...props }) => {
    const [inFavorites, setInFavorites] = useState(initInFavorites);
    const { isAuth } = useAuthContext();
    const toast = useToast();
    const prevInFaforites = useRef<boolean | undefined>();
    const timeout = useRef<NodeJS.Timeout>();

    const handleToggleFavorites = useCallback(async () => {
        if (!isAuth) {
            toast({
                title: 'Login to add to favorites',
                status: 'error',
            });
            return;
        }

        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            if (prevInFaforites.current === inFavorites) return;
            prevInFaforites.current = inFavorites;
            toggleFavorites(inFavorites, adId);
        }, 700);

        setInFavorites((p) => !p);
    }, [adId, inFavorites, isAuth]);

    return (
        <Tooltip label={inFavorites ? 'Remove from favorites' : 'Add to favorites'}>
            <Button
                alignSelf="center"
                aria-label={inFavorites ? 'remove from favorites' : 'add to favorites'}
                p={4}
                size="xl"
                variant="ghost"
                onClick={handleToggleFavorites}
                {...props}
            >
                <StarIcon
                    color={inFavorites ? 'primary.500' : 'transparent'}
                    fontSize="4xl"
                    stroke="primary.500"
                    {...iconProps}
                />
            </Button>
        </Tooltip>
    );
};

export default FavoriteButton;

async function toggleFavorites(inFavorites: boolean | undefined, adId: number) {
    if (inFavorites) await api().favorites.delete({ adId });
    else await api().favorites.create({ adId });
}

