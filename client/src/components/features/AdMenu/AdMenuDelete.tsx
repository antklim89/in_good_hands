import { Button } from '@chakra-ui/react';
import { animalsTypes } from '@in-good-hands/share/constants';
import type { Ad } from '@in-good-hands/share/swager';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

import ConfirmDialog from '~/components/ui/ConfirmDialog';
import { api } from '~/utils';


const adsQuerySchema = z.object({
    search: z.string().optional(),
    type: z.enum(animalsTypes).optional().catch(undefined),
});

const AdMenuDelete = ({ adId }: {adId: number}) => {
    const { mutate } = useSWRConfig();
    const router = useRouter();
    const { search, type } = adsQuerySchema.parse(router.query);

    const handleDeleteAd = useCallback(async () => {
        try {
            await api().ad.delete({ adId });
            await mutate<Ad.FindMany.ResponseBody>(
                ['ads', search, type],
                (prevAds) => prevAds?.filter((prevAd) => prevAd.id !== adId),
                { revalidate: false },
            );
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <ConfirmDialog
            message="Are you sure you want to delete this ad?"
            renderButton={(toggle) => (
                <Button variant="ghost" onClick={toggle}>
                    Delete
                </Button>
            )}
            onConfirm={handleDeleteAd}
        />
    );
};

export default AdMenuDelete;
