import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import useSWR from 'swr';

import FavoriteButton from '~/components/FavoriteButton';
import { api } from '~/utils';


const MyFavorites: FC = () => {
    const { data = [] } = useSWR('my-favorites', () => api().favorites.findMany().then((d) => d.data));

    return (
        <Box>
            {data.map(({ id, ad }) => (
                <Link href={`/ads/${id}`} key={id}>
                    <Box as="a" cursor="pointer">
                        <HStack flexDir={['column', null, 'row']} py={4}>
                            <Flex mr="auto" textTransform="uppercase">
                                <Text px={4} py={0}>{ad.type}</Text>
                                <Text px={4} py={0}>{ad.breed}</Text>
                                <Text px={4} py={0}>{ad.name}</Text>
                                <Text px={4} py={0}>{ad.price}$</Text>
                            </Flex>
                            <FavoriteButton
                                inFavorites
                                adId={ad.id}
                                iconProps={{ fontSize: 'xl' }}
                                size="xs"
                            />
                        </HStack>
                    </Box>
                </Link>
            ))}
        </Box>
    );
};

export default MyFavorites;
