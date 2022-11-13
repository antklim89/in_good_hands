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
                            <Link passHref href="/profile">
                                <MenuItem as="a" onClick={onClose} >
                                    Profile
                                </MenuItem>
                            </Link>
                            <MenuItem as="a" onClick={logout} >
                                Logout
                            </MenuItem>
                        </>)
                    : (
                        <>
                            <Link passHref href="/login">
                                <MenuItem as="a" onClick={onClose} >
                                    Log In
                                </MenuItem>
                            </Link>
                            <Link passHref href="/register">
                                <MenuItem as="a" onClick={onClose} >
                                    Register
                                </MenuItem>
                            </Link>
                        </>
                    )}
            </MenuList>
        </Menu>

    );
};

export default HeaderAuth;
