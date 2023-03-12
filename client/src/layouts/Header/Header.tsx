import { Box, Text, Container } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import HeaderAuth from './HeaderAuth';
import HeaderLinks from './HeaderLinks';
import HeaderLogo from './HeaderLogo';


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
                    color="white"
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

