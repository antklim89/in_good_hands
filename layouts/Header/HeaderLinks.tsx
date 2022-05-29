import { Text, Box } from '@chakra-ui/react';
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
            <Box
                as="ul"
                display="flex"
            >
                {LINKS.map(({ href, title }) => (
                    <Box
                        as="li"
                        key={href}
                        listStyleType="none"

                    >
                        <Link passHref href={href}>
                            <Text
                                as="a"
                                display="inline-block"
                                p={4}
                                textTransform="uppercase"
                            >
                                {title}
                            </Text>
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default HeaderLinks;
