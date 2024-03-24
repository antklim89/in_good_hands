import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';

import { CreateAdButtonProps } from './CreateAdButton.types';

import { api } from '~/utils';


export function useCreateAdButton({ onCreate }: CreateAdButtonProps) {
    const { push } = useRouter();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleCreateNewAd = useCallback(async () => {
        setLoading(true);
        try {
            const { data: ad } = await api().ad.createNew();
            onCreate?.();
            await push(`/ads/update/${ad.id}`);
        } catch (error) {
            toast({ title: 'While creating a new ad, an error occurred. Try again later.', status: 'error' });
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, handleCreateNewAd };
}
