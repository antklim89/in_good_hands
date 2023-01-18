import { useState, useCallback } from 'react';
import { useSWRConfig } from 'swr';

import { MyAdsListItemProps } from './MyAdsList.types';

import { api } from '~/utils';


export function useMyAdsListItem(id: number) {
    const [deleting, setDeleting] = useState(false);
    const { mutate } = useSWRConfig();

    const handleDeleteAd = useCallback(async () => {
        setDeleting(true);
        try {
            await api().ad.delete({ adId: id });
            await mutate<MyAdsListItemProps[]>(
                'my-ads',
                (prevAds) => {
                    return prevAds?.filter((prevAd) => prevAd.id !== id);
                },
                { revalidate: false },
            );
        } catch (error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }, []);

    return { deleting, handleDeleteAd };
}
