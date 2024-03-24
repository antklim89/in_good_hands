import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Box, Text, Container, useColorMode, Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import HeaderAuth from './HeaderAuth';
import HeaderLogo from './HeaderLogo';


const Header: FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box
            as="header"
            bg="primary.600"
            minHeight={4}
            shadow="md"
        >
            <Container alignItems="center" display="flex" maxWidth="container.xl">
                <Text
                    aria-label="logo"
                    as={Link}
                    color="white"
                    href="/"
                >
                    <HeaderLogo color="white" />
                </Text>
                <Box flexGrow={1} />

                <HeaderAuth />
                <Button
                    _hover={{ color: 'primary.600', bg: 'primary.50' }}
                    aria-label="switch color mode"
                    color="white"
                    variant="ghost"
                    onClick={toggleColorMode}
                >
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
            </Container>
        </Box>
    );
};

export default Header;

