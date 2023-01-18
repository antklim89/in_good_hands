import { Flex, Heading, Button, Box } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'nuka-carousel';
import { FC } from 'react';

import { AdsListItemProps } from './AdsList.types';

import FavoriteButton from '~/components/FavoriteButton';
import PetAge from '~/components/PetAge';
import Price from '~/components/Price';
import { getApiURL } from '~/utils';


const AdsListItem: FC<AdsListItemProps> = ({
    id, type, breed, price, images, birthday, inFavorites,
}) => {
    return (
        <Flex
            as="section"
            border="1px solid lightgrey"
            borderRadius="md"
            boxShadow="sm"
            flexDir={['column', 'column', 'row']}
            my={8}
            p={4}
            width="full"
        >
            <Box flex="1 1 200px" mr={[0, 0, 8]}>
                {images.length > 0
                    ? (
                        <Carousel
                            defaultControlsConfig={{ nextButtonText: '>', prevButtonText: '<' }}
                            renderBottomCenterControls={null}
                        >
                            {images.map((image) => (
                                <Image
                                    alt={`${type} ${breed}`}
                                    blurDataURL={image.thumbnail}
                                    height={384}
                                    key={image.id}
                                    layout="responsive"
                                    objectFit="cover"
                                    placeholder="blur"
                                    src={getApiURL(image.src)}
                                    width={640}
                                />
                            ))}
                        </Carousel>
                    )
                    : (
                        <Image
                            alt={`${type} placeholder`}
                            height={720}
                            objectFit="contain"
                            src={`/placeholders/${type}-ph.jpg`}
                            width={1280}
                        />
                    )}
            </Box>

            <Flex flex="5 1 0" flexDirection="row" >
                <Flex flexDirection="column">
                    <Heading fontSize={['xl', '3xl', 'xl', '3xl']} textTransform="uppercase">
                        {type}
                    </Heading>
                    <Heading fontSize={['xl', '3xl', 'xl', '3xl']} textTransform="uppercase">
                        {breed}
                    </Heading>
                    <PetAge birthday={birthday} />
                    <Price flexGrow={1} fontSize={['2xl', '2xl', '3xl']} price={price} />
                </Flex>

                <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    ml="auto"
                >
                    <FavoriteButton adId={id} inFavorites={inFavorites} />
                    <Button as={Link} href={`/ads/${id}`} variant="outline">
                        Show more...
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default AdsListItem;
