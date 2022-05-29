import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';


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

const HeaderLinks: FC = () => {
    return (
        <Box as="nav" ml="auto">
            <Box as="ul" display="flex" listStyleType="none">
                {LINKS.map(({ href, title }) => (
                    <Box as="li" key={href}>
                        <Link passHref href={href}>
                            <Button as="a" textTransform="uppercase" variant="ghost">
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
