import {
    Menu, MenuButton, IconButton, MenuList, Button,
} from '@chakra-ui/react';
import { animalsTypes } from '@in-good-hands/share/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

import ConfirmDialog from '../ConfirmDialog';

import { AdMenuProps } from './AdMenu.types';

import { MyAdsListItemProps } from '~/layouts/MyAdsList/MyAdsList.types';
import { api, useAuthContext } from '~/utils';


const adsQuerySchema = z.object({
    search: z.string().optional(),
    type: z.enum(animalsTypes).optional().catch(undefined),
});


const AdMenu: FC<AdMenuProps> = ({ adId, ownerId, ...props }) => {
    const { user } = useAuthContext();
    const { mutate } = useSWRConfig();
    const router = useRouter();
    const { search, type } = adsQuerySchema.parse(router.query);

    const handleDeleteAd = useCallback(async () => {
        try {
            await api().ad.delete({ adId });
            await mutate<MyAdsListItemProps[]>(
                ['ads', search, type],
                (prevAds) => prevAds?.filter((prevAd) => prevAd.id !== adId),
                { revalidate: false },
            );
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <Menu>

            <MenuButton
                {...props}
                aria-label="Update Ad"
                as={IconButton}
                icon={<FaEllipsisV />}
                variant="ghost"
            />
            <MenuList display="flex" flexDirection="column" >
                <Button variant="ghost">Report</Button>
                {(user?.id === ownerId)
                    ? (
                        <>
                            <Button as={Link} href={`/ads/update/${adId}`} variant="ghost">
                                Update
                            </Button>

                            <ConfirmDialog
                                message="Are you sure you want to delete this ad?"
                                renderButton={(toggle) => (
                                    <Button variant="ghost" onClick={toggle}>
                                        Delete
                                    </Button>

                                )}
                                onConfirm={handleDeleteAd}
                            />
                        </>
                    )
                    : null}
            </MenuList>
        </Menu>
    );
};

export default AdMenu;
