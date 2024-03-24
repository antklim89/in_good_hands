import {
    Box,
    Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Heading, useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC, useRef } from 'react';
import { FaUser } from 'react-icons/fa';

import Auth from '../../features/Auth';

import { HeaderAuthProps } from './Header.types';

import CreateAdButton from '~/components/features/CreateAdButton';
import NoSsr from '~/components/helpers/NoSsr';
import { useAuthContext } from '~/utils';


const HeaderAuth: FC<HeaderAuthProps> = () => {
    const { user, logout } = useAuthContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);

    return (
        <>
            <Button
                _hover={{ color: 'primary.600', bg: 'primary.50' }}
                color="white"
                ref={btnRef}
                variant="ghost"
                onClick={onOpen}
            >
                <FaUser />
            </Button>
            <NoSsr>
                <Drawer
                    isOpen={isOpen}
                    placement="right"
                    size="lg"
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
                                        <Heading mb={4} textAlign="center">
                                            {user.name}
                                        </Heading>
                                        <Button
                                            as={Link} href="/profile"
                                            textTransform="uppercase"
                                            variant="outline"
                                            onClick={onClose}
                                        >
                                            Profile
                                        </Button>
                                
                                        <CreateAdButton onCreate={onClose} />
                                
                                        <Button 
                                            textTransform="uppercase" 
                                            variant="outline"
                                            onClick={logout}
                                        >
                                            Logout
                                        </Button>
                                    </>
                                )
                                : <Auth type="login" onClose={onClose} />}

                            <Box flexGrow={1} />

                            <Button
                                _hover={{ color: 'primary.600', bg: 'primary.50' }}
                                as={Link}
                                href="/about"
                                textTransform="uppercase"
                                variant="outline"
                                onClick={onClose}
                            >
                                about
                            </Button>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </NoSsr>
        </>
    );
};

export default HeaderAuth;
