import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { AdsListProps } from './AdsList.types';

import { useInfinityScroll, api, useUpdate } from '~/utils';


export function useAdsList({ ads: initAds }: AdsListProps) {
    const { query } = useRouter();
    const [ads, setAds] = useState(initAds);

    const { addEvent } = useInfinityScroll(async () => {
        const { data: newAds } = await api().ad.findMany({
            cursor: ads.slice().pop()?.id,
            searchType: query.type as 'cat' | 'dog' | 'bird' | 'aquarium' | 'rodent' | undefined,
            search: query.search as string,
        });
        setAds([...ads, ...newAds]);
        if (newAds.length > 0) addEvent();
    }, 2000);

    useEffect(() => {
        if (ads.length > 0) addEvent();
    }, []);

    useUpdate(() => {
        setAds(initAds);
    }, [query]);

    return { ads };
}
