import {
    Flex, Heading, Button, Box, Center, Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'nuka-carousel';
import { FC } from 'react';

import { AdsListItemProps } from './AdsList.types';

import PetAge from '~/components/PetAge';
import Price from '~/components/Price';
import { getApiURL } from '~/utils';


const AdsListItem: FC<AdsListItemProps> = ({
    id, type, breed, price, images, birthday,
}) => {
    return (
        <Flex
            as="section"
            border="1px solid lightgrey"
            borderRadius="md"
            boxShadow="xl"
            my={8}
            p={4}
            width="full"
        >
            <Box flexBasis={200} flexGrow={1} mr={8}>
                {images.length > 0
                    ? (
                        <Carousel>
                            {images.map((image) => (
                                <Image
                                    alt={`${type} ${breed}`}
                                    blurDataURL={image.thumbnail}
                                    height={270}
                                    key={image.id}
                                    placeholder="blur"
                                    src={getApiURL(image.src)}
                                    width={400}
                                />
                            ))}
                        </Carousel>
                    )
                    : (
                        <Center height="100%">
                            <Text textAlign="center">
                                No<br />Image
                            </Text>
                        </Center>
                    )}
            </Box>
            <Flex flexBasis={200} flexDirection="column" flexGrow={5} >
                <Heading textTransform="uppercase">
                    {type} {breed}
                </Heading>
                <PetAge birthday={birthday} />
                <Price flexGrow={1} fontSize="2xl" price={price} />

                <Flex justifyContent="flex-end">
                    <Link passHref href={`/ads/${id}`}>
                        <Button as="a" variant="outline">
                            Show more...
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default AdsListItem;
