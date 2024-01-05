import { useState, useCallback } from 'react';
import useSWR from 'swr';

import { api } from '~/utils';


export function useMyAdsList() {
    const [hasNext, setHasNext] = useState(false);

    const { data: ads = [], mutate, isLoading } = useSWR('my-ads', async () => {
        const { data } = await api().ad.findMyAds();
        if (data.length > 0) setHasNext(true);
        return data;
    }, {});

    const lastAdId = ads?.slice?.().pop()?.id;

    const handleFetchMore = useCallback(async () => {
        const nextAds = await api().ad.findMyAds({ cursor: lastAdId }).then((d) => d.json());
        if (nextAds.length <= 1) setHasNext(false);
        mutate([...ads || [], ...nextAds], { revalidate: false });
    }, [lastAdId]);

    return { ads, hasNext, handleFetchMore, isLoading };
}
