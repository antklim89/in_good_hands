import { Box, Text, Container } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import { HeaderProps } from './Header.types';
import HeaderLinks from './HeaderLinks';


const Header: FC<HeaderProps> = () => {
    return (
        <Box
            as="header"
            minHeight={4}
            shadow="md"
        >
            <Container alignItems="center" display="flex" maxWidth="container.xl">
                <Link passHref href="/">
                    <Text as="a" fontSize="2xl">
                        In Good Hands
                    </Text>
                </Link>
                <HeaderLinks />
            </Container>
        </Box>
    );
};

export default Header;

