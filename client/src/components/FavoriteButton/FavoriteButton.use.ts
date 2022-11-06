import { useToast } from '@chakra-ui/react';
import { useState, useRef, useCallback } from 'react';

import { FavoriteButtonProps } from './FavoriteButton.types';

import { api, useAuthContext } from '~/utils';


export function useFavoriteButton({ adId, inFavorites: initInFavorites }:FavoriteButtonProps) {
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

    return { handleToggleFavorites, inFavorites };
}

async function toggleFavorites(inFavorites: boolean | undefined, adId: number) {
    if (inFavorites) await api().favorites.delete({ adId });
    else await api().favorites.create({ adId });
}
