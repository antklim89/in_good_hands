import { Box, Text, Container } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import HeaderAuth from './Header.Auth';
import HeaderLinks from './Header.Links';
import HeaderLogo from './Header.Logo';


const Header: FC = () => {
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
                    color="primary.textLight"
                    fontSize="2xl"
                    href="/"
                >
                    <HeaderLogo color="white" />
                </Text>
                <Box flexGrow={1} />
                <HeaderLinks />
                <HeaderAuth />
            </Container>
        </Box>
    );
};

export default Header;

