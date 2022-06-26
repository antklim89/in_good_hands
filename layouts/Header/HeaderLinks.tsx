import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import Protected from '~/components/Protected';
import { requestNewAd } from '~/utils';

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
    const { push } = useRouter();
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
                            onClick={async () => {
                                const adId = await requestNewAd();
                                await push(`/ads/edit/${adId}`);
                                onClose?.();
                            }}
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
