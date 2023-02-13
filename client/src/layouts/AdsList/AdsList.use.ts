import { animalsTypes } from '@in-good-hands/server/src/schemas/adSchemas';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { z } from 'zod';

import { useInfinityScroll, api } from '~/utils';


const adsQuerySchema = z.object({
    search: z.string().optional(),
    type: z.enum(animalsTypes).optional().catch(undefined),
});


export function useAdsList() {
    const router = useRouter();
    const { search, type } = adsQuerySchema.parse(router.query);

    const { data: ads = [], mutate, isLoading } = useSWR(
        ['ads', search, type],
        () => api().ad.findMany({ search, searchType: type }).then((d) => d.data),
    );

    const { addEvent } = useInfinityScroll(async () => {
        const lastId = ads.slice().pop()?.id;
        const { data: newAds } = await api().ad.findMany({ search, searchType: type, cursor: lastId });

        mutate([...ads || [], ...newAds], { revalidate: false });
        if (newAds.length > 0) addEvent();
    }, 2000);

    useEffect(() => {
        if (!isLoading && ads.length > 0) addEvent();
    }, [isLoading]);

    return { ads };
}
