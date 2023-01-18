import {
    Button, Menu, MenuButton, MenuItem, MenuList, Progress,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import Auth from '../Auth';

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
                            <Auth type="login">
                                {({ onOpen }) => (
                                    <MenuItem onClick={onOpen}>
                                        Log In
                                    </MenuItem>
                                )}
                            </Auth>
                            <Auth type="register">
                                {({ onOpen }) => (
                                    <MenuItem onClick={onOpen}>
                                        Register
                                    </MenuItem>
                                )}
                            </Auth>
                        </>
                    )}
            </MenuList>
        </Menu>

    );
};

export default HeaderAuth;
