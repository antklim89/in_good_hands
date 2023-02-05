import {
    Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Progress, useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import Auth from '../Auth';

import { HeaderAuthProps } from './Header.types';

import { useAuthContext } from '~/utils';


const HeaderAuth: FC<HeaderAuthProps> = () => {
    const { user, logout, authInited } = useAuthContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);

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
        <>
            <Button
                colorScheme="primary" ref={btnRef}
                onClick={onOpen}
            >
                <FaUserCircle />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />

                    <DrawerBody
                        display="flex"
                        flexDirection="column"
                        mt={24}
                        sx={{ '& > *': { mb: 4 } }}
                    >
                        {user
                            ? (
                                <>
                                    <Button as={Link} href="/profile" onClick={onClose} >
                                        Profile
                                    </Button>
                                    <Button onClick={logout} >
                                        Logout
                                    </Button>
                                </>
                            )
                            : (
                                <>
                                    <Auth type="login">
                                        {({ onOpen: handleOpen }) => (
                                            <Button onClick={handleOpen}>
                                                Log In
                                            </Button>
                                        )}
                                    </Auth>
                                    <Auth type="register">
                                        {({ onOpen: handleOpen }) => (
                                            <Button onClick={handleOpen}>
                                                Register
                                            </Button>
                                        )}
                                    </Auth>
                                </>
                            )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default HeaderAuth;
