import { Box, Text, Container } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import HeaderAuth from './HeaderAuth';
import HeaderDrawer from './HeaderDrawer';


const Header: FC = () => {
    return (
        <Box
            as="header"
            bg="primary.600"
            minHeight={4}
            shadow="md"
        >
            <Container alignItems="center" display="flex" maxWidth="container.xl">
                <Link passHref href="/">
                    <Text as="a" fontSize="2xl">
                        In Good Hands
                    </Text>
                </Link>
                <Box flexGrow={1} />
                <HeaderDrawer />
                <HeaderAuth />
            </Container>
        </Box>
    );
};

export default Header;

