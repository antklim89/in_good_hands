import { Box, Button, Progress } from '@chakra-ui/react';
import Link from 'next/link';
import { FC, useCallback } from 'react';

import { useAuthContext } from '~/utils';
import { logout } from '~/utils/server';


const HeaderAuth: FC = () => {
    const { isAuth, username, clearCredentials, authInited } = useAuthContext();

    const handleLogout = useCallback(() => {
        logout();
        clearCredentials();
    }, []);

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
                {isAuth
                    ? (
                        <>
                            <Box as="li" >
                                <Button
                                    as="a"
                                    color="primary.textLight"
                                    variant="ghost"
                                >
                                    {username}
                                </Button>
                            </Box>
                            <Box as="li" >
                                <Button
                                    as="a"
                                    color="primary.textLight"
                                    variant="ghost"
                                    onClick={handleLogout}
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
