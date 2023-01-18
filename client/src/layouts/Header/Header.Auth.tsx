import {
    Button, Menu, MenuButton, MenuItem, MenuList, Progress,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import { HeaderAuthProps } from './Header.types';

import { useAuthContext } from '~/utils';


const HeaderAuth: FC<HeaderAuthProps> = ({ onClose }) => {
    const { user, logout, authInited } = useAuthContext();

    if (!authInited) return (
        <Progress
            isIndeterminate
            borderRadius="md"
            colorScheme="primary"
            mx={4}
            width={32}
        />
    );

    return (
        <Menu>
            <MenuButton as={Button}>
                <FaUserCircle />
            </MenuButton>
            <MenuList>
                {user
                    ? (
                        <>
                            <MenuItem as={Link} href="/profile" onClick={onClose} >
                                Profile
                            </MenuItem>
                            <MenuItem onClick={logout} >
                                Logout
                            </MenuItem>
                        </>)
                    : (
                        <>
                            <MenuItem as={Link} href="/login" onClick={onClose} >
                                Log In
                            </MenuItem>
                            <MenuItem as={Link} href="/register" onClick={onClose} >
                                Register
                            </MenuItem>
                        </>
                    )}
            </MenuList>
        </Menu>

    );
};

export default HeaderAuth;
