import { Button, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

import { AdMenuProps } from './AdMenu.types';
import AdMenuDelete from './AdMenuDelete';

import { useAuthContext } from '~/utils';


const AdMenu: FC<AdMenuProps> = ({ adId, ownerId, ...props }) => {
    const { user } = useAuthContext();

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
                            <AdMenuDelete adId={adId} />
                        </>
                    )
                    : null}
            </MenuList>
        </Menu>
    );
};

export default AdMenu;
