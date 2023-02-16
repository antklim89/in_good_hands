import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

import { AdMenuProps } from './AdMenu.types';

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
            <MenuList>
                <MenuItem>Report</MenuItem>
                {(user?.id === ownerId) ? <MenuItem as={Link} href={`/ads/update/${adId}`}>Update</MenuItem> : null}
            </MenuList>
        </Menu>
    );
};

export default AdMenu;
