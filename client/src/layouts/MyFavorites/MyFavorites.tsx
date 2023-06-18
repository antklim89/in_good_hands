import {
    Box, Divider, Flex, HStack, LinkBox, Text, useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, Fragment } from 'react';
import useSWR from 'swr';

import FavoriteButton from '~/components/FavoriteButton';
import { api } from '~/utils';


const MyFavorites: FC = () => {
    const { data: favorites = [] } = useSWR('my-favorites', () => api().favorites.findMany().then((d) => d.data));
    const hoverBg = useColorModeValue('gray.50', 'gray.900');

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
                <Fragment key={id}>
                    <LinkBox
                        _hover={{ bg: hoverBg }}
                        display="flex"
                        py={4}
                    >
                        <Flex as={Link} href={`/ads/${ad.id}`} w="100%">
                            <Box mr={4}>
                                <Image
                                    alt={ad.type}
                                    height={32}
                                    src={`/placeholders/${ad.type}-ph.jpg`}
                                    width={32}
                                />
                            </Box>
                            <Flex flexDirection="column">
                                <Text p={0}>Name: {ad.name}</Text>
                                <Text p={0}>Breed: {ad.breed}</Text>
                            </Flex>
                        </Flex>

                        <HStack alignSelf="flex-end">
                            <FavoriteButton
                                inFavorites
                                adId={ad.id}
                                iconProps={{ fontSize: 'xl' }}
                                size="xs"
                            />
                        </HStack>
                    </LinkBox>
                    <Divider />
                </Fragment>
            ))}
        </Box>
    );
};

export default MyFavorites;
