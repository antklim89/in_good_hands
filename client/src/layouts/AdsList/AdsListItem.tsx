import { Flex, Heading, Button, Box } from '@chakra-ui/react';
import { IMAGE_HEIGHT, IMAGE_WIDHT } from '@in-good-hands/server/src/shareConstants';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { AdsListItemProps } from './AdsList.types';

import Carousel from '~/components/Carousel';
import FavoriteButton from '~/components/FavoriteButton';
import PetAge from '~/components/PetAge';
import Price from '~/components/Price';
import { getApiURL } from '~/utils';


const SCALE = 2;
const imgWidth = IMAGE_WIDHT / SCALE;
const imgHeight = IMAGE_HEIGHT / SCALE;

const AdsListItem: FC<AdsListItemProps> = ({
    id, type, breed, price, images, birthday, inFavorites,
}) => {
    return (
        <Flex
            border="1px solid lightgrey"
            borderRadius="md"
            boxShadow="sm"
            flexDir={['column', 'column', 'row']}
            p={4}
            width="full"
        >
            <Box flex="1 1 200px" mr={[0, 0, 8]} sx={{ 'img': { m: '0 auto', width: imgWidth, objectFit: 'cover', aspectRatio: `${imgWidth} / ${imgHeight}` } }}>
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
                                    height={imgHeight}
                                    key={image.id}
                                    placeholder="blur"
                                    src={getApiURL(image.src)}
                                    width={imgWidth}
                                />
                            ))}
                        </Carousel>
                    )
                    : (
                        <Image
                            alt={`${type} placeholder`}
                            height={imgHeight}
                            src={`/placeholders/${type}-ph.jpg`}
                            width={imgWidth}
                        />
                    )}
            </Box>

            <Flex flex="5 1 0" flexDirection="row" >
                <Flex flexDirection="column">
                    <Link href={`/ads/${id}`}>
                        <Heading fontSize={['xl', 'xl', '2xl']} textTransform="uppercase">
                            {type}
                            <br />
                            {breed}
                        </Heading>
                    </Link>
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
