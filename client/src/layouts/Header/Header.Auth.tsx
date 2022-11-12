import { Box, Button, Progress } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

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
        <nav>
            <Box as="ul" display="flex" listStyleType="none">
                {user
                    ? (
                        <>
                            <Box as="li" >
                                <Link passHref href="/profile">
                                    <Button
                                        as="a"
                                        color="primary.textLight"
                                        variant="ghost"
                                        onClick={onClose}
                                    >
                                        {user.name}
                                    </Button>
                                </Link>
                            </Box>
                            <Box as="li" >
                                <Button
                                    as="a"
                                    color="primary.textLight"
                                    variant="ghost"
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </Box>
                        </>)
                    : (
                        <>
                            <Box as="li" >
                                <Link passHref href="/login">
                                    <Button
                                        as="a"
                                        color="primary.textLight"
                                        variant="ghost"
                                        onClick={onClose}
                                    >
                                        Log In
                                    </Button>
                                </Link>
                            </Box>
                            <Box as="li" >
                                <Link passHref href="/register">
                                    <Button
                                        as="a"
                                        color="primary.textLight"
                                        variant="ghost"
                                        onClick={onClose}
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </Box>
                        </>
                    )}
            </Box>
        </nav>
    );
};

export default HeaderAuth;
