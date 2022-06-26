import { Flex, Box, Heading, Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'nuka-carousel';
import { FC } from 'react';

import PetAge from '~/components/PetAge';
import Price from '~/components/Price';
import { getStrapiUrl } from '~/utils';

import { AdsListItemProps } from './AdsList.types';


const AdsListItem: FC<AdsListItemProps> = ({ id, attributes: { type, breed, images, birthday, price } }) => {
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
                <Carousel
                    autoplay
                    wrapAround
                    autoplayInterval={5000}
                    pauseOnHover={false}
                >
                    {images.data.map((image) => (
                        <Image
                            alt={`${type} ${breed}`}
                            height={270}
                            key={image.id}
                            src={getStrapiUrl(image.attributes.url)}
                            width={400}
                        />
                    ))}
                </Carousel>
            </Box>
            <Flex flexBasis={200} flexDirection="column" flexGrow={5} >
                <Heading>
                    {type} {breed}
                </Heading>
                <PetAge birthday={birthday} />
                <Price flexGrow={1} fontSize="2xl" price={price} />
                <Flex justifyContent="flex-end">
                    <Link passHref href={`/ad/${id}`}>
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
