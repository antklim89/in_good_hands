import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';

import { HeaderLinksProps } from './Header.types';

import Protected from '~/components/Protected';
import { api } from '~/utils';


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
    const { push } = useRouter();

    const handleCreateNewAd = useCallback(async () => {
        const { data: ad } = await api().ad.createNew();
        onClose?.();
        await push(`/ads/update/${ad.id}`);
    }, []);

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
                                color="primary.textLight"
                                textTransform="uppercase"
                                variant="ghost"
                                onClick={onClose}
                            >
                                {title}
                            </Button>
                        </Link>
                    </Box>
                ))}
                <Protected protectedComponent="">
                    <Box as="li">
                        <Button
                            as="a"
                            color="primary.textLight"
                            textTransform="uppercase"
                            variant="ghost"
                            onClick={handleCreateNewAd}
                        >
                            create ad
                        </Button>
                    </Box>
                </Protected>
            </Box>
        </Box>
    );
};

export default HeaderLinks;
