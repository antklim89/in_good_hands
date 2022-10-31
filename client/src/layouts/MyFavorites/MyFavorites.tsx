import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import useSWR from 'swr';

import FavoriteButton from '~/components/FavoriteButton';
import { api } from '~/utils';


const MyFavorites: FC = () => {
    const { data: favorites = [] } = useSWR('my-favorites', () => api().favorites.findMany().then((d) => d.data));

    return (
        <Box>
            {
                favorites.length === 0
                    ? (
                        <Text my={4} textAlign="center">
                            You have not add favorites ads yet.
                        </Text>
                    )
                    : null
            }
            {favorites.map(({ id, ad }) => (
                <Box key={id}>
                    <HStack flexDir={['column', null, 'row']} py={4}>
                        <Link href={`/ads/${ad.id}`}>
                            <Flex
                                alignItems="center"
                                as="a"
                                cursor="pointer"
                                mr="auto"
                                textTransform="uppercase"
                            >
                                <Text px={4} py={0}>{ad.type} <br /> {ad.breed}</Text>
                                <Text px={4} py={0}>{ad.name}</Text>
                                <Text px={4} py={0}>{ad.price}$</Text>
                            </Flex>
                        </Link>
                        <FavoriteButton
                            inFavorites
                            adId={ad.id}
                            iconProps={{ fontSize: 'xl' }}
                            size="xs"
                        />
                    </HStack>
                </Box>
            ))}
        </Box>
    );
};

export default MyFavorites;
