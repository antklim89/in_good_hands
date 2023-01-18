import { useState, useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { MyAdsListItemProps } from './MyAdsList.types';

import { api } from '~/utils';


export function useMyAdsList() {
    const [hasNext, setHasNext] = useState(false);

    const { data: ads = [], mutate } = useSWR('my-ads', async () => {
        const { data } = await api().ad.findMyAds();
        if (data.length > 0) setHasNext(true);
        return data;
    }, {});

    const lastAdId = ads?.slice?.().pop()?.id;

    const handleFetchMore = useCallback(async () => {
        const nextAds = await api().ad.findMyAds({ cursor: lastAdId }).then((d) => d.data);
        if (nextAds.length <= 1) setHasNext(false);
        mutate([...ads || [], ...nextAds], { revalidate: false });
    }, [lastAdId]);

    return { ads, hasNext, handleFetchMore };
}

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
