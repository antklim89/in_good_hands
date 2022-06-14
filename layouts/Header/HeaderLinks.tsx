import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import Protected from '~/components/Protected';

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
    {
        href: '/create ad',
        title: 'create ad',
        isProtected: true,
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
                {LINKS.map(({ href, title, isProtected }) => (
                    <Protected disableProtection={!isProtected} key={href} protectedComponent="">
                        <Box as="li">
                            <Link passHref href={href}>
                                <Button
                                    as="a"
                                    color="primary.textLight"
                                    textTransform="uppercase"
                                    variant="ghost"
                                    onClick={onClose}
                                >
                                    {title}
                                </Button>
                            </Link>
                        </Box>
                    </Protected>
                ))}
            </Box>
        </Box>
    );
};

export default HeaderLinks;
