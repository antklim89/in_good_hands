import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import { HeaderLinksProps } from './Header.types';


const LINKS = [
    {
        href: '/',
        title: 'home',
    },
    {
        href: '/ads',
        title: 'all ads',
    },
    {
        href: '/about',
        title: 'about',
    },
];

const HeaderLinks: FC<HeaderLinksProps> = ({ onClose, ...props }) => {
    return (
        <Box as="nav">
            <Box
                as="ul"
                display="flex"
                listStyleType="none"
                {...props}
            >
                {LINKS.map(({ href, title }) => (
                    <Box as="li" key={href}>
                        <Link passHref href={href}>
                            <Button
                                as="a"
                                color="primary.text"
                                colorScheme="primary"
                                textTransform="uppercase"
                                variant="ghost"
                                onClick={onClose}
                            >
                                {title}
                            </Button>
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default HeaderLinks;
